import {
  Attested as AttestedEvent,
  ModuleRegistration as ModuleRegistrationEvent,
  Revoked as RevokedEvent,
} from "../generated/Registry/Registry";
import {
  ModuleRegistration,
  Attested,
  Revoked,
  AttestedQuery,
} from "../generated/schema";

export function handleModuleRegistration(event: ModuleRegistrationEvent): void {
  const entity = new ModuleRegistration(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.implementation = event.params.implementation;
  entity.sender = event.params.sender;
  entity.resolver = event.params.resolver;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleAttested(event: AttestedEvent): void {
  const entity = new Attested(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.subject = event.params.subject;
  entity.attester = event.params.attester;
  entity.schema = event.params.schema;
  entity.dataPointer = event.params.dataPointer;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
  createOrUpdateAttestedQuery(event);
}

export function handleRevoked(event: RevokedEvent): void {
  const entity = new Revoked(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.subject = event.params.subject;
  entity.revoker = event.params.revoker;
  entity.schema = event.params.schema;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
  revokeAttestedQuery(event);
}

function createOrUpdateAttestedQuery(event: AttestedEvent): void {
  const attestedQueryId = event.params.subject.concatI32(
    event.params.attester.toI32()
  );

  let attestedQuery = AttestedQuery.load(attestedQueryId);

  if (attestedQuery == null) {
    attestedQuery = new AttestedQuery(attestedQueryId);
    attestedQuery.subject = event.params.subject;
    attestedQuery.attester = event.params.attester;
  }

  attestedQuery.schema = event.params.schema;
  attestedQuery.dataPointer = event.params.dataPointer;
  attestedQuery.isRevoked = false;

  attestedQuery.blockNumber = event.block.number;
  attestedQuery.blockTimestamp = event.block.timestamp;
  attestedQuery.transactionHash = event.transaction.hash;

  attestedQuery.save();
}

function revokeAttestedQuery(event: RevokedEvent): void {
  const attestedQueryId = event.params.subject.concatI32(
    event.params.revoker.toI32()
  );

  let attestedQuery = AttestedQuery.load(attestedQueryId);

  if (attestedQuery !== null) {
    attestedQuery.isRevoked = true;
    attestedQuery.save();
  }
}
