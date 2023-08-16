import React from "react"
import PropTypes from "prop-types"

import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion"

const ProductDetailsAccordion = ({ items = [], preExpanded = "" }) => (
  <Accordion allowZeroExpanded preExpanded={[preExpanded]}>
    {items.map(item => (
      <>
        {item.content && (
          <AccordionItem uuid={item.uid}>
            <AccordionItemHeading>
              <AccordionItemButton>{item.title}</AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel
              className="rte leading-snug"
              dangerouslySetInnerHTML={{
                __html: item.content,
              }}
            />
          </AccordionItem>
        )}
      </>
    ))}
  </Accordion>
)

ProductDetailsAccordion.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      uuid: PropTypes.string,
      title: PropTypes.string,
      content: PropTypes.string,
    })
  ),
  preExpanded: PropTypes.string,
}

export default ProductDetailsAccordion
