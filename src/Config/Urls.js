// Will remove
export const CoverPhotoUrl = "http://localhost:5000/api/CoverPhotoUpload";
export const LogoPhotoUrl = "http://localhost:5000/api/LogoPhotoUpload";

//Manage Photos
export const PhotoUpload = "http://localhost:5000/api/UploadPhoto";
export const DeletePhoto = "http://localhost:5000/api/DeletePhotos";

// Get Cover Image
export const GetCoverImage = (schoolAuthID, imageAddress) =>
  `http://localhost:5000/Images/${schoolAuthID}/SchoolCover/${imageAddress}`;

// Get Logo Image
export const GetLogoImage = (schoolAuthID, imageAddress) =>
  `http://localhost:5000/Images/${schoolAuthID}/SchoolLogo/${imageAddress}`;

// Get Gallery Image
export const GetGalleryImage = (schoolAuthID, imageAddress) =>
  `http://localhost:5000/Images/${schoolAuthID}/SchoolGallery/${imageAddress}`;

// Download Perposal
export const DownloadPerposal = (schoolAuthID, imageAddress) =>
  `http://localhost:5000/Images/${schoolAuthID}/SchoolPerposal/${imageAddress}`;

// Authentication
export const Register = `http://localhost:5000/api/register`;
export const Login = `http://localhost:5000/api/login`;

// Get All Data
export const getProfileData = `http://localhost:5000/api/getall`;

// Retrive Images
export const getGalleryImage = (schoolID, imageAddress) =>
  `http://localhost:5000/Images/${schoolID}/SchoolGallery/${imageAddress}`;

// School Profile
export const AddSchoolProfile = `http://localhost:5000/api/addSchoolProfile`;
export const UpdateSchoolProfile = `http://localhost:5000/api/UpdateSchoolProfile`;
export const GetAllProfiles = `http://localhost:5000/api/getAllSchoolProfile`;
