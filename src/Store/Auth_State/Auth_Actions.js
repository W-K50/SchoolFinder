export const AUTH_STATE = "AUTH_STATE";
export const SCHOOL_PROFILE = "SCHOOL_PROFILE";

export const getAuth_Payload = (user) => ({
  type: AUTH_STATE,
  payload: { user },
});

export function getAuth_Data(user) {
  return (dispatch) => {
    dispatch(getAuth_Payload(user));
  };
}

export const getSchoolProfile_Payload = (schPro) => ({
  type: SCHOOL_PROFILE,
  payload: { schPro },
});

export function getSchoolProfile_Data(schPro) {
  return (dispatch) => {
    dispatch(getSchoolProfile_Payload(schPro));
  };
}
