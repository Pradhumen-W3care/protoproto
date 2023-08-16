import { getCmsUrl } from "@utilities"

/**
 * Makes a request to Craft's Commerce Controllers
 * @author Josh Smith <by@joshthe.dev>
 * @param  {String} options.url
 * @param  {String} options.method
 * @param  {Object} options.params
 * @param  {Object} data
 * @param  {Object} headers
 */
const makeRequest = async (
  url = "",
  { method = "GET", params = {}, data = {}, headers = {} }
) => {
  let apiUrl = getCmsUrl(url)
  const options = {
    method,
    mode: "cors",
    credentials: "include",
    headers: {
      "Access-Control-Allow-Origin": "http://localhost:8000/",
      "Content-Type": "application/json",
      Accept: "application/json",
      "X-Requested-With": "XMLHttpRequest",
      ...headers,
    },
  }

  // Check if we have data to send
  if (Object.keys(data).length) {
    options.body = JSON.stringify(data)
  }

  // Add QS params
  if (Object.keys(params).length) {
    const qs = Object.keys(params)
      .map(key => `${key}=${params[key]}`)
      .join("&")
    apiUrl = `${apiUrl}?${qs}`
  }

  const response = await fetch(apiUrl, options)
  return response.json()
}

/**
 * Performs an update cart request
 * @author Josh Smith <by@joshthe.dev>
 * @param  object data
 * @return Promise
 */
async function updateCart(data) {
  return await makeRequest("", {
    method: "POST",
    params: { action: "commerce/cart/update-cart" },
    data,
  })
}

/**
 * Performs a get cart request
 * @author Josh Smith <by@joshthe.dev>
 * @param  object data
 * @return Promise
 */
async function getCart() {
  return await makeRequest("", {
    params: { action: "commerce/cart/get-cart" },
  })
}

/**
 * Performs a get countries request
 * @author Josh Smith <by@joshthe.dev>
 * @param  object data
 * @return Promise
 */
async function getCountries() {
  return await makeRequest("api/v1/countries", { method: "GET" })
}

/**
 * Performs an update cart request
 * @author Josh Smith <by@joshthe.dev>
 * @param  object data
 * @return Promise
 */
async function processPayment(data) {
  return await makeRequest("", {
    method: "POST",
    params: { action: "commerce/payments/pay" },
    data,
  })
}

/**
 * Sends a contact message to Proto Proto
 * @param object data
 * @returns
 */
async function sendContactMessage(data) {
  return await makeRequest("api/v1/contact/send", {
    method: "POST",
    data,
  })
}

export { updateCart, getCart, getCountries, processPayment, sendContactMessage }
