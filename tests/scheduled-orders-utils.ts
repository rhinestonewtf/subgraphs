import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  ExecutionAdded,
  ExecutionStatusUpdated,
  ExecutionTriggered,
  ExecutionsCancelled
} from "../generated/ScheduledOrders/ScheduledOrders"

export function createExecutionAddedEvent(
  smartAccount: Address,
  jobId: BigInt
): ExecutionAdded {
  let executionAddedEvent = changetype<ExecutionAdded>(newMockEvent())

  executionAddedEvent.parameters = new Array()

  executionAddedEvent.parameters.push(
    new ethereum.EventParam(
      "smartAccount",
      ethereum.Value.fromAddress(smartAccount)
    )
  )
  executionAddedEvent.parameters.push(
    new ethereum.EventParam("jobId", ethereum.Value.fromUnsignedBigInt(jobId))
  )

  return executionAddedEvent
}

export function createExecutionStatusUpdatedEvent(
  smartAccount: Address,
  jobId: BigInt
): ExecutionStatusUpdated {
  let executionStatusUpdatedEvent = changetype<ExecutionStatusUpdated>(
    newMockEvent()
  )

  executionStatusUpdatedEvent.parameters = new Array()

  executionStatusUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "smartAccount",
      ethereum.Value.fromAddress(smartAccount)
    )
  )
  executionStatusUpdatedEvent.parameters.push(
    new ethereum.EventParam("jobId", ethereum.Value.fromUnsignedBigInt(jobId))
  )

  return executionStatusUpdatedEvent
}

export function createExecutionTriggeredEvent(
  smartAccount: Address,
  jobId: BigInt
): ExecutionTriggered {
  let executionTriggeredEvent = changetype<ExecutionTriggered>(newMockEvent())

  executionTriggeredEvent.parameters = new Array()

  executionTriggeredEvent.parameters.push(
    new ethereum.EventParam(
      "smartAccount",
      ethereum.Value.fromAddress(smartAccount)
    )
  )
  executionTriggeredEvent.parameters.push(
    new ethereum.EventParam("jobId", ethereum.Value.fromUnsignedBigInt(jobId))
  )

  return executionTriggeredEvent
}

export function createExecutionsCancelledEvent(
  smartAccount: Address
): ExecutionsCancelled {
  let executionsCancelledEvent = changetype<ExecutionsCancelled>(newMockEvent())

  executionsCancelledEvent.parameters = new Array()

  executionsCancelledEvent.parameters.push(
    new ethereum.EventParam(
      "smartAccount",
      ethereum.Value.fromAddress(smartAccount)
    )
  )

  return executionsCancelledEvent
}
