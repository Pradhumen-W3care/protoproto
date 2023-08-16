import React, { useState } from "react"
import ReCAPTCHA from "react-google-recaptcha"

import { sendContactMessage } from "../utilities/api"

import FormInputGroup from "./Form/InputGroup"
import FormTextAreaGroup from "./Form/TextAreaGroup"
import Button from "./Button"

const ContactForm = ({ className }) => {
  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [message, setMessage] = useState()
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const recaptchaRef = React.createRef()

  const onSubmitWithReCAPTCHA = async e => {
    e.preventDefault()
    setLoading(true)
    try {
      const token = await recaptchaRef.current.executeAsync()
      await sendContactMessage({ name, email, message, token })
    } catch (err) {
      console.log("err: ", err)
    }
    setSent(true)
  }

  return (
    <div className={`container mx-auto ${className}`}>
      <div className="px-6">
        <div className="flex -mx-6">
          <div className="xl:w-1/2 lg:w-2/3 w-full px-6 mx-auto text-center">
            <h2 className={`xl:text-2.5xl md:text-2xl text-xl md:mb-12 mb-10 ${sent ? ('opacity-0') : ('')}`}>
              Like to know more or tell us about your project?
            </h2>
            {sent ? (
              <p className="text-xl italic pb-28 pt-70 md:pt-28">
                Thanks for your enquiry, we'll be in touch soon.
              </p>
            ) : (
              <form className="mb-24" onSubmit={onSubmitWithReCAPTCHA}>
                <FormInputGroup
                  id="name"
                  label="Name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
                <FormInputGroup
                  id="email"
                  type="email"
                  label="Email"
                  value={email}
                  required
                  onChange={e => setEmail(e.target.value)}
                />
                <FormTextAreaGroup
                  id="message"
                  label="Message"
                  value={message}
                  required
                  onChange={e => setMessage(e.target.value)}
                />
                <ReCAPTCHA
                  ref={recaptchaRef}
                  badge="none"
                  size="invisible"
                  sitekey={process.env.GATSBY_RECAPTCHA_SITE_KEY}
                />
                <Button type="submit">{loading ? `Sending` : `Send`}</Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactForm
