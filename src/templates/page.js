import React from "react"
import Layout from "@components/Layout"

import { graphql } from "gatsby"

const Page = ({ data }) => {
  const {
    allCraftEntryInterface: {
      nodes: [{ pageContent, seomatic }],
    },
  } = data

  return (
    <Layout seomatic={seomatic}>
      <div className="container mx-auto pt-16 px-6">
        <div className="flex justify-center">
          <div
            className="prose mt-12"
            dangerouslySetInnerHTML={{ __html: pageContent }}
          />
        </div>
      </div>
    </Layout>
  )
}

export default Page

export const query = graphql`
  query ($slug: String) {
    allCraftEntryInterface(filter: { slug: { eq: $slug } }) {
      nodes {
        seomatic {
          ... on Craft_SeomaticType {
            metaJsonLdContainer
            metaLinkContainer
            metaScriptContainer
            metaSiteVarsContainer
            metaTagContainer
            metaTitleContainer
          }
        }
        ... on Craft_returnsPolicy_returnsPolicy_Entry {
          pageContent
        }
        ... on Craft_privacyPolicy_privacyPolicy_Entry {
          pageContent
        }
        ... on Craft_termsOfService_termsOfService_Entry {
          pageContent
        }
      }
    }
  }
`
