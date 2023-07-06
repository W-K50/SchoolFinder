import axios from "axios";

const BASE_URL = "http://SchoolFinder.hostionic.com/api";
const BASE_URL_IMG = "http://SchoolFinder.hostionic.com";

// Authentication (Confirm)
export const Register = `${BASE_URL}/register`;
export const Login = `${BASE_URL}/login`;

// Get All Data (Confirm)
export const getProfileData = `${BASE_URL}/getall`;

// Email Verification (Confirm)
export const SendEmailVerification = `${BASE_URL}/emailVerification`;

// School Profile (Confirm)
export const AddSchoolProfile = `${BASE_URL}/addSchoolProfile`;
export const UpdateSchoolProfile = `${BASE_URL}/UpdateSchoolProfile`;
export const GetAllProfiles = `${BASE_URL}/getAllSchoolProfile`;

//Manage Photos (Confirm)
export const PhotoUpload = `${BASE_URL}/UploadPhoto`;
export const DeletePhoto = `${BASE_URL}/DeletePhotos`;

// Get Cover Image (Confirm)
export const GetCoverImage = (schoolAuthID, imageAddress) =>
  `${BASE_URL_IMG}/Images/${schoolAuthID}/SchoolCover/${imageAddress}`;

// Get Logo Image (Confirm)
export const GetLogoImage = (schoolAuthID, imageAddress) =>
  `${BASE_URL_IMG}/Images/${schoolAuthID}/SchoolLogo/${imageAddress}`;

// Get Gallery Image (Confirm)
export const GetGalleryImage = (schoolAuthID, imageAddress) =>
  `${BASE_URL_IMG}/Images/${schoolAuthID}/SchoolGallery/${imageAddress}`;

// Download Perposal (Confirm)
export const DownloadPerposal = (schoolAuthID, imageAddress) =>
  `${BASE_URL_IMG}/Images/${schoolAuthID}/SchoolPerposal/${imageAddress}`;

// Retrive Images (Confirm)
export const getGalleryImage = (schoolID, imageAddress) =>
  `${BASE_URL_IMG}/Images/${schoolID}/SchoolGallery/${imageAddress}`;

// Change Password
export const changePassword = `${BASE_URL}/changePassword`;
export const sendResetPasswordEmail = `${BASE_URL}/forgetPasswordEmail`;

// Recommand System
export const recommandSystem = `${BASE_URL}/recommandIncrement`;
export const recommandSystemValue = `${BASE_URL}/recommandSystemValue`;

export default axios.create({
  baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

// Will remove
export const CoverPhotoUrl = "http://localhost:5000/api/CoverPhotoUpload";
export const LogoPhotoUrl = "http://localhost:5000/api/LogoPhotoUpload";
