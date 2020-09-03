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
const product = require("../model/product");
const { get } = require("http");
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

    if (search === undefined || search === null || search === "") {
      search = "%";
    } else {
      search = "%" + search + "%";
    }
    if (sort === undefined || sort === null || sort === "") {
      sort = `product_id`;
    }
    if (page === undefined || page === null || page === "") {
      page = parseInt(1);
    } else {
      page = parseInt(page);
    }
    if (limit === undefined || limit === null || limit === "") {
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
    // console.log(pageInfo)
    try {
      const result = await getProduct(search, sort, limit, offset);
      //proses set data result ke redis
      client.set(
        `getproduct:${JSON.stringify(request.query)}`,
        JSON.stringify(result)
      );
      // console.log(result);
      return helper.response(
        response,
        200,
        "Succes get product",
        result,
        pageInfo
      );
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
      client.set(`getproductbyid:${id}`, 3600, JSON.stringify(result));
      if (result.length > 0) {
        return helper.response(
          response,
          200,
          "Succes get product By Id",
          result
        );
      } else {
        return helper.response(response, 404, "Not Found");
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
      // console.log(result)
    } catch (error) {
      // return helper.response(response, 400, 'Bad Request', error)
      console.log(error);
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
      // const setData = {
      //     //kanan dari database dan kiri dari postman
      //     product_nama: request.body.product_nama,
      //     product_harga: request.body.product_harga,
      //     product_created_at: new Date(),
      //     product_status: request.body.product_status
      // }
      const result = await postProduct(setData);
      return helper.response(response, 201, "Product Created", result);
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
        product_img,
        product_status,
      } = request.body;
      const setData = {
        category_id,
        product_name,
        product_price,
        product_img,
        product_created_at: new Date(),
        product_status,
      };
      const checkId = await getProductById(id);
      if (checkId.length > 0) {
        const result = await patchProduct(setData, id);
        return helper.response(response, 200, "Patch Done", result);
      } else {
        return helper.response(response, 404, "Not found", result);
      }
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error);
    }
  },
  deleteProduct: async (request, response) => {
    try {
      const { id } = request.params;
      const result = await deleteProduct(id);
      return helper.response(response, 200, "Delete Done", result);
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error);
    }
  },
};
