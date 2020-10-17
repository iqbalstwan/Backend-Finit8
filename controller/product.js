const {
  getProduct,
  getProductCount,
  getProductById,
  getProductByName,
  postProduct,
  patchProduct,
  deleteProduct,
} = require("../model/product");
const helper = require("../helper/indexhlp");
const { request, response } = require("express");
const qs = require("querystring");
// const product = require("../model/product");
// const { get } = require("http");

const fs = require("fs");
const redis = require("redis");
const client = redis.createClient();

const getPrevLink = (page, currentQuery) => {
  if (page > 1) {
    const generatePage = {
      page: page - 1,
    };
    const resultPrevLink = { ...currentQuery, ...generatePage };
    return qs.stringify(resultPrevLink);
    // console.log(qs.stringify(resultPrevLink)) //qs.stringify mengeluarkan object menjadi string
  } else {
    return null;
  }
};

const getNextLink = (page, totalPage, currentQuery) => {
  if (page < totalPage) {
    const generatePage = {
      page: page + 1,
    };
    const resultNextLink = { ...currentQuery, ...generatePage };
    return qs.stringify(resultNextLink);
    // console.log(qs.stringify(resultPrevLink)) //qs.stringify mengeluarkan object menjadi string
  } else {
    return null;
  }
};

module.exports = {
  getAllProduct: async (request, response) => {
    let { page, limit, search, sort } = request.query;

    if (search === undefined || search === "") {
      search = "%";
    } else {
      search = "%" + search + "%";
    }
    if (sort === undefined || sort === "") {
      sort = `product_id`;
    }
    if (page === undefined || page === "") {
      page = parseInt(1);
    } else {
      page = parseInt(page);
    }
    if (limit === undefined || limit === "") {
      limit = parseInt(9);
    } else {
      limit = parseInt(limit);
    }

    page = parseInt(page);
    limit = parseInt(limit);
    let totalData = await getProductCount();
    let totalPage = Math.ceil(totalData / limit);
    let offset = page * limit - limit;
    let prevLink = getPrevLink(page, request.query);
    let nextLink = getNextLink(page, totalPage, request.query);
    const pageInfo = {
      page, //page : page
      totalPage,
      limit,
      totalData,
      prevLink: prevLink && `http://127.0.0.1:3001/product? ${prevLink}`,
      nextLink: nextLink && `http://127.0.0.1:3001/product? ${nextLink}`,
    };
    try {
      const result = await getProduct(search, sort, limit, offset);
      if (result.length > 0) {
        const newResult = {
          data: result,
          page: pageInfo,
        };
        client.set(
          `getproduct:${JSON.stringify(request.query)}`,
          JSON.stringify(newResult)
        );
        return helper.response(
          response,
          200,
          "Succes get product",
          result,
          pageInfo
        );
      } else {
        return helper.response(
          response,
          404,
          "Product not found",
          result,
          pageInfo
        );
      }
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error);
    }
  },
  getProductById: async (request, response) => {
    try {
      //    const id = request.params.id
      //sama aja
      const { id } = request.params;
      const result = await getProductById(id);

      if (result.length > 0) {
        client.setex(`getproductbyid:${id}`, 1800, JSON.stringify(result));
        return helper.response(
          response,
          200,
          "Succes get product By Id",
          result
        );
      } else {
        return helper.response(
          response,
          404,
          `Product By Id : ${id} Not Found`
        );
      }
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error);
    }
  },

  getProductByName: async (request, response) => {
    try {
      const { keyword } = request.params;
      const result = await getProductByName(keyword);
      if (result.length > 0) {
        return helper.response(
          response,
          201,
          "Success Get Product By Name",
          result
        );
      } else {
        return helper.response(
          response,
          404,
          `Product ${name} Not Found`,
          error
        );
      }
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error);
    }
  },

  postProduct: async (request, response) => {
    try {
      const {
        category_id,
        product_name,
        product_price,
        product_status,
      } = request.body;
      const setData = {
        category_id,
        product_name,
        product_price,
        product_img: request.file === undefined ? "" : request.file.filename,
        product_created_at: new Date(),
        product_status,
      };
      if (setData.category_id === "") {
        return helper.response(response, 404, ` Input ID!`);
      } else if (setData.product_name === "") {
        return helper.response(response, 404, ` Input Product Name!`);
      } else if (setData.product_img === "") {
        return helper.response(response, 404, ` Select Image!`);
      } else if (setData.product_price === "") {
        return helper.response(response, 404, ` Input Product Price!`);
      } else if (setData.product_status === "") {
        return helper.response(response, 404, ` Input Product Status!`);
      } else {
        // const setData = {
        //     //kanan dari database dan kiri dari postman
        //     product_nama: request.body.product_nama,
        //     product_harga: request.body.product_harga,
        //     product_created_at: new Date(),
        //     product_status: request.body.product_status
        // }
        const result = await postProduct(setData);
        return helper.response(response, 201, "Product Created", result);
      }
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error);
    }
  },

  //patch
  patchProduct: async (request, response) => {
    try {
      const { id } = request.params;
      const {
        category_id,
        product_name,
        product_price,
        product_status,
      } = request.body;
      const setData = {
        category_id,
        product_name,
        product_price,
        product_img: request.file === undefined ? "" : request.file.filename,
        product_update_at: new Date(),
        product_status,
      };
      if (setData.category_id === "") {
        return helper.response(response, 404, ` Input ID!`);
      } else if (setData.product_name === "") {
        return helper.response(response, 404, ` Input Product Name!`);
      } else if (setData.product_img === "") {
        return helper.response(response, 404, ` Select Image!`);
      } else if (setData.product_price === "") {
        return helper.response(response, 404, ` Input Product Price!`);
      } else if (setData.product_status === "") {
        return helper.response(response, 404, ` Input Product Status!`);
      } else {
        const checkId = await getProductById(id);
        const img = checkId[0].product_img;
        console.log(checkId);
        if (checkId.length > 0) {
          fs.unlink(`./uploads/${img}`, async (error) => {
            if (error) {
              throw error;
            } else {
              const result = await patchProduct(setData, id);
              return helper.response(response, 201, "Product Updated", result);
            }
          });
        } else {
          return helper.response(response, 404, ` Not Found`);
        }
      }
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error);
    }
  },
  deleteProduct: async (request, response) => {
    try {
      const { id } = request.params;
      const checkId = await getProductById(id);
      if (checkId.length > 0) {
        fs.unlink(`./uploads/${checkId[0].product_img}`, async (error) => {
          if (error) {
            throw error;
          } else {
            const result = await deleteProduct(id);
            return helper.response(response, 201, "Product Deleted", result);
          }
        });
      } else {
        return helper.response(response, 404, ` Not Found`);
      }
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error);
    }
  },
};
