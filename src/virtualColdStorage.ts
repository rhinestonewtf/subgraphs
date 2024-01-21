import { Bytes } from "@graphprotocol/graph-ts";
import {
  ExecutionExecuted as ExecutionExecutedEvent,
  ExecutionRequested as ExecutionRequestedEvent,
} from "../generated/VirtualColdStorage/VirtualColdStorage";
import {
  ExecutionExecuted,
  ExecutionRequested,
  ExecutionRequestedQuery,
} from "../generated/schema";

export function handleExecutionExecuted(event: ExecutionExecutedEvent): void {
  let entity = new ExecutionExecuted(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.subAccount = event.params.subAccount;
  entity.target = event.params.target;
  entity.value = event.params.value;
  entity.callData = event.params.callData;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
  updateExecutionRequestedQuery(event);
}

export function handleExecutionRequested(event: ExecutionRequestedEvent): void {
  let entity = new ExecutionRequested(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.subAccount = event.params.subAccount;
  entity.target = event.params.target;
  entity.value = event.params.value;
  entity.callData = event.params.callData;
  entity.executeAfter = event.params.executeAfter;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
  createExecutionRequestedQuery(event);
}

export function createExecutionRequestedQuery(
  event: ExecutionRequestedEvent
): void {
  const executionQueryId = event.params.subAccount
    .concat(event.params.target)
    .concat(new Bytes(event.params.value.toU32()))
    .concat(event.params.callData);

  const entity = new ExecutionRequestedQuery(executionQueryId);
  entity.subAccount = event.params.subAccount;
  entity.target = event.params.target;
  entity.value = event.params.value;
  entity.callData = event.params.callData;
  entity.executeAfter = event.params.executeAfter;
  entity.isExecuted = false;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function updateExecutionRequestedQuery(
  event: ExecutionExecutedEvent
): void {
  const executionQueryId = event.params.subAccount
    .concat(event.params.target)
    .concat(new Bytes(event.params.value.toU32()))
    .concat(event.params.callData);

  const entity = ExecutionRequestedQuery.load(executionQueryId);

  if (entity) {
    entity.isExecuted = true;
    entity.save();
  }
}
