export const baseDomain = "http://127.0.0.1:8080";
export const baseURL = `${baseDomain}/api`;

export const createImageUrl = (url) => !url || url.startsWith("http") || url.startsWith("blob:http") ? url : baseDomain + url;