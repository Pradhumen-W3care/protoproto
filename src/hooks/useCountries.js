import { useEffect, useState } from "react"
import { Api } from "@utilities"

const useCountries = () => {
  const [countries, setCountries] = useState(null)

  useEffect(() => {
    async function getCountries() {
      const { data } = await Api.getCountries()
      setCountries(data)
    }
    getCountries()
  }, [])

  return countries
}

export default useCountries
