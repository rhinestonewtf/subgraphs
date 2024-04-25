import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt, Address, Bytes } from "@graphprotocol/graph-ts"
import {
  ModuleInstalled,
  ModuleUninstalled,
  TryExecuteUnsuccessful
} from "../generated/SmartAccount/SmartAccount"

export function createModuleInstalledEvent(
  moduleTypeId: BigInt,
  module: Address
): ModuleInstalled {
  let moduleInstalledEvent = changetype<ModuleInstalled>(newMockEvent())

  moduleInstalledEvent.parameters = new Array()

  moduleInstalledEvent.parameters.push(
    new ethereum.EventParam(
      "moduleTypeId",
      ethereum.Value.fromUnsignedBigInt(moduleTypeId)
    )
  )
  moduleInstalledEvent.parameters.push(
    new ethereum.EventParam("module", ethereum.Value.fromAddress(module))
  )

  return moduleInstalledEvent
}

export function createModuleUninstalledEvent(
  moduleTypeId: BigInt,
  module: Address
): ModuleUninstalled {
  let moduleUninstalledEvent = changetype<ModuleUninstalled>(newMockEvent())

  moduleUninstalledEvent.parameters = new Array()

  moduleUninstalledEvent.parameters.push(
    new ethereum.EventParam(
      "moduleTypeId",
      ethereum.Value.fromUnsignedBigInt(moduleTypeId)
    )
  )
  moduleUninstalledEvent.parameters.push(
    new ethereum.EventParam("module", ethereum.Value.fromAddress(module))
  )

  return moduleUninstalledEvent
}

export function createTryExecuteUnsuccessfulEvent(
  batchExecutionindex: BigInt,
  result: Bytes
): TryExecuteUnsuccessful {
  let tryExecuteUnsuccessfulEvent = changetype<TryExecuteUnsuccessful>(
    newMockEvent()
  )

  tryExecuteUnsuccessfulEvent.parameters = new Array()

  tryExecuteUnsuccessfulEvent.parameters.push(
    new ethereum.EventParam(
      "batchExecutionindex",
      ethereum.Value.fromUnsignedBigInt(batchExecutionindex)
    )
  )
  tryExecuteUnsuccessfulEvent.parameters.push(
    new ethereum.EventParam("result", ethereum.Value.fromBytes(result))
  )

  return tryExecuteUnsuccessfulEvent
}
