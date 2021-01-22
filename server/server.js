const express = require("express");
const app = express();
const port = process.env.PORT || process.argv[2] || 8080;
const cors = require("cors");

app.use(cors());
app.use(express.json());

const SHUTTERSTOCK_API_TOKEN =
  "v2/ZzdwYW1ONzhkcnB1azc4SWhQTEJmTEpyVXlDWmh2b1QvMjkyMTAyOTMxL2N1c3RvbWVyLzMvVm1SQWlVQTE2VWVYUmVuX01mUDhrYTdhT19UdVJ0ejJLbTMzekJkMmZwN1JUZmNEdUktSzI1dVJBMWZsUXRtS1BpRDZMSGNJdXJDb2hQOEhpRVhPZWVoSF9BX3AwWllIQnlYbndCcmJib1lXbm5vbFZQZ3BrYlIxM3JOTUs1cDFYVWhDem9WN2tiWi12a3R3RjQwUm41TExiRWNjOEVVMkRkYlJCRy1uSTVHN3JmUnJCT25YV19TX1RZeGQ3ZHFOVkRaUEkzYVZNejFCLS1LNEtMODZkQQ";

// const sstk = require("shutterstock-api");

// sstk.setAccessToken(SHUTTERSTOCK_API_TOKEN);

// const imagesApi = new sstk.ImagesApi();

// const queryParams = {
//   query: "hiking",
//   image_type: "photo",
//   orientation: "vertical",
//   people_number: 3,
// };

// imagesApi
//   .searchImages(queryParams)
//   .then(({ data }) => {
//     console.log(data);
//   })
//   .catch((error) => {
//     console.error(error);
//   });

const sstk = require("shutterstock-api");

const applicationConsumerId = "g7pamN78drpuk78IhPLBfLJrUyCZhvoT";
const applicationConsumerSecret = "t8uM9TYDNyfQQGSW";
sstk.setBasicAuth(applicationConsumerId, applicationConsumerSecret);

const imagesApi = new sstk.ImagesApi();

const queryParams = {
  query: "kites",
  image_type: "photo",
  page: 1,
  per_page: 5,
  sort: "popular",
  view: "minimal",
};

imagesApi
  .searchImages(queryParams)
  .then(({ data }) => {
    console.log(data);
  })
  .catch((error) => {
    console.error(error);
  });

app.listen(port, () => {
  console.log("The server is running on port 8080");
});
