import httpService from "./http.service";

const qualityEndPoint = "qualities/";

const qualityService = {
    get: async () => {
        const { data } = await httpService.get(qualityEndPoint);
        return data;
    }
};

export default qualityService;
