
import axios from "axios";

const api_url = "http://127.0.0.1:7000/api/"

export const axiosInstance = axios.create({
	baseURL: api_url,
	timeout: 5000,
	headers: {
		Authorization: localStorage.getItem('access_token')
			? `Bearer ${localStorage.getItem('access_token')}`
			: null,
		'Content-Type': 'application/json',
		accept: 'application/json',
	}, 
});

axiosInstance.interceptors.response.use(
  (response) => {
		return response;
	},
	async function (error) {
		const originalRequest = error.config;

		if (typeof error.response === 'undefined') {
			alert(
				'Cannot access the server'
			);
			return Promise.reject(error);
		}

		if (
			error.response.status === 401 &&
			originalRequest.url === api_url + 'token/refresh/'
		) {
			window.location.href = '/login/';
			return Promise.reject(error);
		}

		if (
			error.response.data.code === 'token_not_valid' &&
			error.response.status === 401 &&
			error.response.statusText === 'Unauthorized'
		) {
			const refreshToken = localStorage.getItem('refresh_token');
			if (refreshToken) {
        const tokenParts = JSON.parse(atob(refreshToken.split('.')[1]))
				const now = Math.ceil(Date.now() / 1000);
				if (tokenParts.exp > now) {
					return axiosInstance
						.post('token/refresh/', { refresh: refreshToken })
						.then((response) => {
							localStorage.setItem('access_token', response.data.access);
              axiosInstance.defaults.headers['Authorization'] = `Bearer ${response.data.access}`;
              originalRequest.headers['Authorization'] = `Bearer ${response.data.access}`;
							return axiosInstance(originalRequest);
						})
						.catch((err) => {
							console.log(err);
						});
				} else {
					console.log('Refresh token is expired', tokenParts.exp, now);
					window.location.href = '/login/';
				}
			} else {
				console.log('Refresh token not available.');
				window.location.href = '/login/';
			}
		}
		return Promise.reject(error);
	}
);


export const getClasses = async () => {
    try {
      const response = axiosInstance
      .get("class-list/")
      .then((res)=>{
      if (res.statusText !== "OK") {
        throw new Error(res.data.message);
      }
      return res.data;
      })
      return response
    } catch (err) {
      console.log(err);
      return { error: err.response.data.message || err.message };
    }
};
export const getCourses = async () => {
  try {
    const response = axiosInstance
    .get("course-list/")
    .then((res)=>{
    if (res.statusText !== "OK") {
      throw new Error(res.data.message);
    }
    return res.data;
    })
    return response
  } catch (err) {
    console.log(err);
    return { error: err.response.data.message || err.message };
  }
};
export const getStudents = async () => {
  try {
    const response = axiosInstance
    .get("student-list/")
    .then((res)=>{
    if (res.statusText !== "OK") {
      throw new Error(res.data.message);
    }
    return res.data;
    })
    return response
  } catch (err) {
    console.log(err);
    return { error: err.response.data.message || err.message };
  }
};
export const getStudent = async (id) => {
  try {
    const response = axiosInstance
    .get(`student/${id}`)
    .then((res)=>{
    if (res.statusText !== "OK") {
      throw new Error(res.data.message);
    }
    return res.data;
    })
    return response
  } catch (err) {
    console.log(err);
    return { error: err.response.data.message || err.message };
  }
};
export const createClass = async (obj) => {
    try {
      const response = axiosInstance
      .post("create-class/",obj)
      .then((res)=>{
        if(res.statusText !== "OK")
        {

          throw new Error(res.data)
        }
        else
          return res.data;
      })
      return response
    } catch (err) {
      console.log(err)
    }
};
export const choose = async (id,list) => {
  try {
    const response = axiosInstance
    .post(`choose/${id}`,list)
    .then((res)=>{
      if(res.statusText !== "OK")
      {

        throw new Error(res.data)
      }
      else
        return res.data;
    })
    return response
  } catch (err) {
    console.log(err)
  }
};
export const createCourse = async (obj) => {
  try {
    const response = axiosInstance
    .post("create-course/",obj)
    .then((res)=>{
      if(res.statusText !== "OK")
      {

        throw new Error(res.data)
      }
      else
        return res.data;
    })
    return response
  } catch (err) {
    console.log(err)
  }
};
export const addStudentsToClass = async (id,data) => {
  try {
    const response = axiosInstance
    .post(`add-student/${id}`,data)
    .then((res)=>{
      if (res.statusText !== "OK") {
        throw new Error(res.data.message);
      }
      return res.data;
    })
    return response;
  } catch (err) {
    console.log(err);
    return { error: err.response.data.message || err.message };
  }
}

export const login = async (user) => {
  try {
    const response = axiosInstance
    .post("token/",user)
    .then((res)=>{
      if (res.statusText !== "OK") {
        throw new Error(res.data.message);
      }

      localStorage.setItem('access_token', res.data.access);
      localStorage.setItem('refresh_token', res.data.refresh);
      return res.data;
    })
    return response
  } catch (err) {
    console.log(err);
    return { error: err.response.data.message || err.message };
  }
};

export const getUserInfo = async()=>{
  const response = await axiosInstance.get(`user-info/`)
    .then(async(res)=>{
      if (res.statusText !== "OK") {
        return null;
      }
      else
      return res.data;
    })
    return response
  }