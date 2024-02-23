import { BigInt } from "@graphprotocol/graph-ts";
import {
  ExecutionAdded as ExecutionAddedEvent,
  ExecutionStatusUpdated as ExecutionStatusUpdatedEvent,
  ExecutionTriggered as ExecutionTriggeredEvent,
  ExecutionsCancelled as ExecutionsCancelledEvent,
  ScheduledTransfers,
} from "../generated/ScheduledTransfers/ScheduledTransfers";
import {
  ExecutionAdded,
  ExecutionStatusUpdated,
  ExecutionTriggered,
  ExecutionsCancelled,
  ScheduledTransfersExecutionAddedQuery,
  ScheduledTransfersExecutionTriggeredQuery,
} from "../generated/schema";
import { store, log } from "@graphprotocol/graph-ts";

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
  createScheduledTransfersQuery(event);
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
  createTriggeredOrderQuery(event);
  updateScheduledTransfersQuery(event);
}

export function handleExecutionsCancelled(
  event: ExecutionsCancelledEvent
): void {
  let entity = new ExecutionsCancelled(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.smartAccount = event.params.smartAccount;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function createScheduledTransfersQuery(
  event: ExecutionAddedEvent
): void {
  const contract = ScheduledTransfers.bind(event.address);
  const jobDetails = contract.getAccountJobDetails(
    event.params.smartAccount,
    event.params.jobId
  );

  const executionQueryId = event.params.smartAccount.concatI32(
    event.params.jobId.toI32()
  );

  const entity = new ScheduledTransfersExecutionAddedQuery(executionQueryId);

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

export function createTriggeredOrderQuery(
  event: ExecutionTriggeredEvent
): void {
  const contract = ScheduledTransfers.bind(event.address);
  const jobDetails = contract.getAccountJobDetails(
    event.params.smartAccount,
    event.params.jobId
  );

  const executionQueryId = event.params.smartAccount.concatI32(
    event.params.jobId.toI32()
  );

  const entity = new ScheduledTransfersExecutionTriggeredQuery(
    executionQueryId
  );

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

export function updateScheduledTransfersQuery(
  event: ExecutionTriggeredEvent
): void {
  const id = event.params.smartAccount.concatI32(event.params.jobId.toI32());

  const entity = ScheduledTransfersExecutionAddedQuery.load(id);

  if (entity) {
    entity.numberOfExecutionsCompleted = entity.numberOfExecutionsCompleted.plus(
      new BigInt(1)
    );
    entity.lastExecutionTime = event.block.timestamp;

    entity.save();
  }
}
