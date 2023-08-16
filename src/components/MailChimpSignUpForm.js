import React, { useCallback, useState } from "react"

import { RightArrow as RightArrowIcon } from "./Icons"

const MailChimpSignUpForm = () => {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isError, setIsError] = useState(false)
  const [formMessage, setFormMessage] = useState("")

  const cmsUrl = process.env.GATSBY_CMS_URL

  /**
   * Handles the MailChimp subscribe form submission
   */
  const handleSubmit = useCallback(
    async e => {
      e.preventDefault()

      try {
        setIsSubmitting(true)
        setIsError(false)

        const response = await fetch(
          `${cmsUrl}/actions/mailchimp-subscribe/audience/subscribe`,
          {
            method: "POST",
            cache: "no-cache",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              "X-Requested-With": "XMLHttpRequest",
            },
            body: JSON.stringify({
              email,
            }),
          }
        )
        const { message } = await response.json()

        setEmail("")
        setFormMessage(message)

        setTimeout(() => {
          setFormMessage("")
        }, 2000)
      } catch (err) {
        setIsError(true)
        setFormMessage("Sorry, something went wrong. Please try again.")
      }
      setIsSubmitting(false)
    },
    [cmsUrl, email]
  )

  return (
    <form method="POST" onSubmit={handleSubmit}>
      <div className={`flex${isSubmitting ? ` text-gray-500` : ``}`}>
        <input
          className={`border border-r-0 border-gray-700 p-2 min-w-0 w-full${
            isSubmitting ? ` bg-gray-300` : ``
          }`}
          type="email"
          required
          placeholder="EMAIL"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <button
          disabled={isSubmitting}
          type="submit"
          className={`border border-l-0 border-gray-700 p-2${
            isSubmitting ? ` bg-gray-300` : ``
          }`}
        >
          <RightArrowIcon />
        </button>
      </div>
      {formMessage && (
        <div className="mt-1">
          <div className={`${isError ? `text-red-600` : ``}`}>
            {formMessage}
          </div>
        </div>
      )}
    </form>
  )
}

export default MailChimpSignUpForm
