import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export interface StudentView {
    id: string;
    messages: Array<Message>;
    name: string;
    artwork?: ExternalBlob;
    level: ExamLevel;
    exams: Array<Exam>;
    guardian: string;
}
export interface Artwork {
    id: string;
    title: string;
    artistId: string;
    level: ExamLevel;
    image: ExternalBlob;
    isPublic: boolean;
}
export interface Message {
    id: string;
    content: string;
    date: bigint;
}
export interface Exam {
    id: string;
    date: bigint;
    level: ExamLevel;
    score: bigint;
}
export interface UserProfile {
    studentId?: string;
    name: string;
    role: string;
}
export enum ExamLevel {
    Purna = "Purna",
    Year1 = "Year1",
    Year2 = "Year2",
    Year3 = "Year3",
    Year4 = "Year4",
    Year5 = "Year5",
    Year6 = "Year6",
    Year7 = "Year7",
    Year8 = "Year8",
    Adhya = "Adhya",
    Madhya = "Madhya"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    approveAdmission(id: string): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    getArtwork(artworkId: string): Promise<Artwork | null>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getPublicArtworks(): Promise<Array<Artwork>>;
    getStudent(studentId: string): Promise<StudentView | null>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    promoteStudent(studentId: string, newLevel: ExamLevel): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    searchStudentsByName(searchTerm: string): Promise<Array<StudentView>>;
    sendMessage(content: string): Promise<void>;
    submitAdmissionForm(studentName: string, guardianName: string, level: ExamLevel, artwork: ExternalBlob): Promise<string>;
    uploadArtwork(title: string, artistId: string, level: ExamLevel, isPublic: boolean, image: ExternalBlob): Promise<void>;
}
