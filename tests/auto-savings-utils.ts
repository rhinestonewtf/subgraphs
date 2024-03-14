import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import { AutoSaveExecuted } from "../generated/AutoSavings/AutoSavings"

export function createAutoSaveExecutedEvent(
  smartAccount: Address,
  token: Address,
  amountReceived: BigInt
): AutoSaveExecuted {
  let autoSaveExecutedEvent = changetype<AutoSaveExecuted>(newMockEvent())

  autoSaveExecutedEvent.parameters = new Array()

  autoSaveExecutedEvent.parameters.push(
    new ethereum.EventParam(
      "smartAccount",
      ethereum.Value.fromAddress(smartAccount)
    )
  )
  autoSaveExecutedEvent.parameters.push(
    new ethereum.EventParam("token", ethereum.Value.fromAddress(token))
  )
  autoSaveExecutedEvent.parameters.push(
    new ethereum.EventParam(
      "amountReceived",
      ethereum.Value.fromUnsignedBigInt(amountReceived)
    )
  )

  return autoSaveExecutedEvent
}
