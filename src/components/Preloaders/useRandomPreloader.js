import { useState } from "react"

import ProtoABA from "./ProtoABA"
import ProtoBCB from "./ProtoBCB"
import ProtoCDC from "./ProtoCDC"
import ProtoDED from "./ProtoDED"
import ProtoEFE from "./ProtoEFE"
import ProtoFGF from "./ProtoFGF"
import ProtoGHG from "./ProtoGHG"
import ProtoHIH from "./ProtoHIH"

const preloaders = [
  ProtoABA,
  ProtoBCB,
  ProtoCDC,
  ProtoDED,
  ProtoEFE,
  ProtoFGF,
  ProtoGHG,
  ProtoHIH,
]

/**
 * Returns a random protoproto preloader
 */
const useRandomPreloader = () => {
  const [randPreloader] = useState(() =>
    Math.floor(Math.random() * preloaders.length)
  )
  const Preloader = preloaders[randPreloader]
  return Preloader
}

export default useRandomPreloader
