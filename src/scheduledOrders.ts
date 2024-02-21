import {
  ExecutionAdded as ExecutionAddedEvent,
  ExecutionStatusUpdated as ExecutionStatusUpdatedEvent,
  ExecutionTriggered as ExecutionTriggeredEvent,
  ScheduledOrders,
} from "../generated/ScheduledOrders/ScheduledOrders";
import {
  ExecutionAdded,
  ExecutionStatusUpdated,
  ExecutionTriggered,
  ExecutionAddedQuery,
} from "../generated/schema";
import { Bytes, BigInt } from "@graphprotocol/graph-ts";

export function handleExecutionAdded(event: ExecutionAddedEvent): void {
  let entity = new ExecutionAdded(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.smartAccount = event.params.smartAccount;
  entity.jobId = event.params.jobId;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
  createScheduledOrdersQuery(event);
}

export function handleExecutionStatusUpdated(
  event: ExecutionStatusUpdatedEvent
): void {
  let entity = new ExecutionStatusUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.smartAccount = event.params.smartAccount;
  entity.jobId = event.params.jobId;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleExecutionTriggered(event: ExecutionTriggeredEvent): void {
  let entity = new ExecutionTriggered(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.smartAccount = event.params.smartAccount;
  entity.jobId = event.params.jobId;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
  updateScheduledOrdersQuery(event);
}

export function createScheduledOrdersQuery(event: ExecutionAddedEvent): void {
  const contract = ScheduledOrders.bind(event.address);
  const jobDetails = contract.getAccountJobDetails(
    event.params.smartAccount,
    event.params.jobId
  );

  const executionQueryId = event.params.smartAccount.concatI32(
    event.params.jobId.toI32()
  );

  const entity = new ExecutionAddedQuery(executionQueryId);

  entity.smartAccount = event.params.smartAccount;
  entity.jobId = event.params.jobId;

  // job details
  entity.executeInterval = jobDetails.executeInterval;
  entity.numberOfExecutions = BigInt.fromI32(jobDetails.numberOfExecutions);
  entity.numberOfExecutionsCompleted = BigInt.fromI32(
    jobDetails.numberOfExecutionsCompleted
  );
  entity.startDate = jobDetails.startDate;
  entity.executionData = jobDetails.executionData;
  entity.isEnabled = jobDetails.isEnabled;
  entity.lastExecutionTime = jobDetails.lastExecutionTime;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function updateScheduledOrdersQuery(
  event: ExecutionTriggeredEvent
): void {
  const id = event.params.smartAccount.concatI32(event.params.jobId.toI32());

  const entity = ExecutionAddedQuery.load(id);

  if (entity) {
    entity.numberOfExecutionsCompleted = entity.numberOfExecutionsCompleted.plus(
      new BigInt(1)
    );
    entity.lastExecutionTime = event.block.timestamp;

    entity.save();
  }
}
