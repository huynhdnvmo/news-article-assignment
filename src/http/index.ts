import Axios from "axios";
import MockAdapter from "axios-mock-adapter";

const http = Axios.create({
  timeout: 30000,
});

export default http;

export const httpMock = Axios.create();

export const mockAdapter = new MockAdapter(httpMock);
