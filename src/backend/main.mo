import Map "mo:core/Map";
import List "mo:core/List";
import Array "mo:core/Array";
import Iter "mo:core/Iter";
import Text "mo:core/Text";
import Time "mo:core/Time";
import Order "mo:core/Order";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";
import MixinStorage "blob-storage/Mixin";
import Storage "blob-storage/Storage";

actor {
  // Configure components
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);
  include MixinStorage();

  // Types
  public type ExamLevel = {
    #Adhya;
    #Madhya;
    #Purna;
    #Year1;
    #Year2;
    #Year3;
    #Year4;
    #Year5;
    #Year6;
    #Year7;
    #Year8;
  };

  public type Student = {
    id : Text;
    name : Text;
    guardian : Text;
    level : ExamLevel;
    artwork : ?Storage.ExternalBlob;
    exams : List.List<Exam>;
    messages : List.List<Message>;
  };

  public type Teacher = {
    id : Text;
    name : Text;
  };

  public type Exam = {
    id : Text;
    level : ExamLevel;
    score : Nat;
    date : Int;
  };

  public type Message = {
    id : Text;
    content : Text;
    date : Int;
  };

  public type Artwork = {
    id : Text;
    title : Text;
    artistId : Text;
    level : ExamLevel;
    isPublic : Bool;
    image : Storage.ExternalBlob;
  };

  public type AdmissionForm = {
    id : Text;
    studentName : Text;
    guardianName : Text;
    level : ExamLevel;
    artwork : Storage.ExternalBlob;
    approved : Bool;
  };

  public type UserProfile = {
    name : Text;
    role : Text;
    studentId : ?Text;
  };

  public type StudentView = {
    id : Text;
    name : Text;
    guardian : Text;
    level : ExamLevel;
    artwork : ?Storage.ExternalBlob;
    exams : [Exam];
    messages : [Message];
  };

  // Persistent storage
  let students = Map.empty<Text, Student>();
  let teachers = Map.empty<Text, Teacher>();
  let artworks = Map.empty<Text, Artwork>();
  let admissions = Map.empty<Text, AdmissionForm>();
  let userProfiles = Map.empty<Principal, UserProfile>();
  let studentPrincipals = Map.empty<Text, Principal>();

  // Extensions
  module ExamLevel {
    public func toText(level : ExamLevel) : Text {
      switch (level) {
        case (#Adhya) { "Adhya" };
        case (#Madhya) { "Madhya" };
        case (#Purna) { "Purna" };
        case (#Year1) { "Year1" };
        case (#Year2) { "Year2" };
        case (#Year3) { "Year3" };
        case (#Year4) { "Year4" };
        case (#Year5) { "Year5" };
        case (#Year6) { "Year6" };
        case (#Year7) { "Year7" };
        case (#Year8) { "Year8" };
      };
    };
  };

  module Student {
    public func compareByName(student1 : Student, student2 : Student) : Order.Order {
      Text.compare(student1.name, student2.name);
    };

    public func compareByLevel(student1 : Student, student2 : Student) : Order.Order {
      Text.compare(ExamLevel.toText(student1.level), ExamLevel.toText(student2.level));
    };
  };

  // User Profile Management (Required by frontend)
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Core System Functions
  public shared ({ caller }) func submitAdmissionForm(studentName : Text, guardianName : Text, level : ExamLevel, artwork : Storage.ExternalBlob) : async Text {
    // Public admission form - no authorization check needed (guests can submit)
    let id = Time.now().toText();
    let form : AdmissionForm = {
      id;
      studentName;
      guardianName;
      level;
      artwork;
      approved = false;
    };
    admissions.add(id, form);
    id;
  };

  public shared ({ caller }) func approveAdmission(id : Text) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can approve admissions");
    };
    switch (admissions.get(id)) {
      case (null) { Runtime.trap("Admission not found") };
      case (?form) {
        let studentId = id;
        let student : Student = {
          id = studentId;
          name = form.studentName;
          guardian = form.guardianName;
          level = form.level;
          artwork = ?form.artwork;
          exams = List.empty<Exam>();
          messages = List.empty<Message>();
        };
        students.add(studentId, student);
        admissions.remove(id);
      };
    };
  };

  public shared ({ caller }) func promoteStudent(studentId : Text, newLevel : ExamLevel) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can promote students");
    };
    switch (students.get(studentId)) {
      case (null) { Runtime.trap("Student not found") };
      case (?student) {
        let updatedStudent = {
          student with level = newLevel
        };
        students.add(studentId, updatedStudent);
      };
    };
  };

  public query ({ caller }) func searchStudentsByName(searchTerm : Text) : async [StudentView] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can search students");
    };

    students.values().toArray().map<Student, StudentView>(
      func(student) {
        {
          id = student.id;
          name = student.name;
          guardian = student.guardian;
          level = student.level;
          artwork = student.artwork;
          exams = student.exams.values().toArray();
          messages = student.messages.values().toArray();
        };
      }
    );
  };

  public shared ({ caller }) func uploadArtwork(title : Text, artistId : Text, level : ExamLevel, isPublic : Bool, image : Storage.ExternalBlob) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can upload artwork");
    };
    let id = Time.now().toText();
    let artwork : Artwork = {
      id;
      title;
      artistId;
      level;
      isPublic;
      image;
    };
    artworks.add(id, artwork);
  };

  public shared ({ caller }) func sendMessage(content : Text) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can send messages");
    };
    let message : Message = {
      id = Time.now().toText();
      content;
      date = Time.now();
    };
    for ((id, student) in students.entries()) {
      let updatedMessages = List.empty<Message>();
      updatedMessages.add(message);
      for (msg in student.messages.values()) {
        updatedMessages.add(msg);
      };
      let updatedStudent = {
        student with
        messages = updatedMessages;
      };
      students.add(id, updatedStudent);
    };
  };

  public query ({ caller }) func getStudent(studentId : Text) : async ?StudentView {
    // Students can view their own data, admins can view any student
    let isOwnStudent = switch (userProfiles.get(caller)) {
      case (?profile) {
        switch (profile.studentId) {
          case (?id) { id == studentId };
          case null { false };
        };
      };
      case null { false };
    };

    if (not isOwnStudent and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own student data");
    };

    switch (students.get(studentId)) {
      case (null) { null };
      case (?student) {
        ?{
          id = student.id;
          name = student.name;
          guardian = student.guardian;
          level = student.level;
          artwork = student.artwork;
          exams = student.exams.values().toArray();
          messages = student.messages.values().toArray();
        };
      };
    };
  };

  public query ({ caller }) func getArtwork(artworkId : Text) : async ?Artwork {
    switch (artworks.get(artworkId)) {
      case (null) { null };
      case (?artwork) {
        // Public artworks are accessible to everyone
        if (artwork.isPublic) {
          ?artwork;
        } else {
          // Private artworks only accessible to admins
          if (not AccessControl.isAdmin(accessControlState, caller)) {
            Runtime.trap("Unauthorized: Only admins can view private artwork");
          };
          ?artwork;
        };
      };
    };
  };

  public query ({ caller }) func getPublicArtworks() : async [Artwork] {
    // Public gallery - no authorization check needed
    artworks.values().toArray();
  };
};
