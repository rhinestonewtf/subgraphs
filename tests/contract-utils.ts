import { newMockEvent } from "matchstick-as";
import { ethereum, Address, BigInt, Bytes } from "@graphprotocol/graph-ts";
import {
  ExecutionExecuted,
  ExecutionRequested,
} from "../generated/VirtualColdStorage/VirtualColdStorage";

export function createExecutionExecutedEvent(
  subAccount: Address,
  target: Address,
  value: BigInt,
  callData: Bytes
): ExecutionExecuted {
  let executionExecutedEvent = changetype<ExecutionExecuted>(newMockEvent());

  executionExecutedEvent.parameters = new Array();

  executionExecutedEvent.parameters.push(
    new ethereum.EventParam(
      "subAccount",
      ethereum.Value.fromAddress(subAccount)
    )
  );
  executionExecutedEvent.parameters.push(
    new ethereum.EventParam("target", ethereum.Value.fromAddress(target))
  );
  executionExecutedEvent.parameters.push(
    new ethereum.EventParam("value", ethereum.Value.fromUnsignedBigInt(value))
  );
  executionExecutedEvent.parameters.push(
    new ethereum.EventParam("callData", ethereum.Value.fromBytes(callData))
  );

  return executionExecutedEvent;
}

export function createExecutionRequestedEvent(
  subAccount: Address,
  target: Address,
  value: BigInt,
  callData: Bytes,
  executeAfter: BigInt
): ExecutionRequested {
  let executionRequestedEvent = changetype<ExecutionRequested>(newMockEvent());

  executionRequestedEvent.parameters = new Array();

  executionRequestedEvent.parameters.push(
    new ethereum.EventParam(
      "subAccount",
      ethereum.Value.fromAddress(subAccount)
    )
  );
  executionRequestedEvent.parameters.push(
    new ethereum.EventParam("target", ethereum.Value.fromAddress(target))
  );
  executionRequestedEvent.parameters.push(
    new ethereum.EventParam("value", ethereum.Value.fromUnsignedBigInt(value))
  );
  executionRequestedEvent.parameters.push(
    new ethereum.EventParam("callData", ethereum.Value.fromBytes(callData))
  );
  executionRequestedEvent.parameters.push(
    new ethereum.EventParam(
      "executeAfter",
      ethereum.Value.fromUnsignedBigInt(executeAfter)
    )
  );

  return executionRequestedEvent;
}
