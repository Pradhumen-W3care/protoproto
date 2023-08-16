import * as Api from "@utilities/api"

/**
 * Returns a CMS URL
 * @author Josh Smith <josh@batch.nz>
 * @param  string uri
 * @return string
 */
const getCmsUrl = (uri = "") => {
  return `${process.env.GATSBY_CMS_URL}/${uri}`
}

const isAddressValid = address => {
  let chars = 0
  for (const component in address) {
    if (
      typeof address[component] === "string" &&
      ["id", "dateCreated", "dateUpdated"].indexOf(component) === -1
    ) {
      chars += address[component] ? address[component].length : 0
    }
  }

  return chars > 0
}

export { getCmsUrl, Api, isAddressValid }
