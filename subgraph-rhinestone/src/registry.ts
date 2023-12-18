import {
  Attested as AttestedEvent,
  ModuleDeployed as ModuleDeployedEvent,
  ModuleDeployedExternalFactory as ModuleDeployedExternalFactoryEvent,
  ModuleRegistration as ModuleRegistrationEvent,
  NewSchemaResolver as NewSchemaResolverEvent,
  Revoked as RevokedEvent,
  RevokedOffchain as RevokedOffchainEvent,
  SchemaRegistered as SchemaRegisteredEvent,
  SchemaResolverRegistered as SchemaResolverRegisteredEvent,
  Timestamped as TimestampedEvent
} from "../generated/Registry/Registry"
import {
  Attested,
  ModuleDeployed,
  ModuleDeployedExternalFactory,
  ModuleRegistration,
  NewSchemaResolver,
  Revoked,
  RevokedOffchain,
  SchemaRegistered,
  SchemaResolverRegistered,
  Timestamped
} from "../generated/schema"

export function handleAttested(event: AttestedEvent): void {
  let entity = new Attested(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.subject = event.params.subject
  entity.attester = event.params.attester
  entity.schema = event.params.schema
  entity.dataPointer = event.params.dataPointer

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleModuleDeployed(event: ModuleDeployedEvent): void {
  let entity = new ModuleDeployed(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.implementation = event.params.implementation
  entity.salt = event.params.salt
  entity.resolver = event.params.resolver

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleModuleDeployedExternalFactory(
  event: ModuleDeployedExternalFactoryEvent
): void {
  let entity = new ModuleDeployedExternalFactory(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.implementation = event.params.implementation
  entity.factory = event.params.factory
  entity.resolver = event.params.resolver

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleModuleRegistration(event: ModuleRegistrationEvent): void {
  let entity = new ModuleRegistration(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.implementation = event.params.implementation
  entity.sender = event.params.sender
  entity.resolver = event.params.resolver

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleNewSchemaResolver(event: NewSchemaResolverEvent): void {
  let entity = new NewSchemaResolver(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.uid = event.params.uid
  entity.resolver = event.params.resolver

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRevoked(event: RevokedEvent): void {
  let entity = new Revoked(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.subject = event.params.subject
  entity.revoker = event.params.revoker
  entity.schema = event.params.schema

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRevokedOffchain(event: RevokedOffchainEvent): void {
  let entity = new RevokedOffchain(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.revoker = event.params.revoker
  entity.data = event.params.data
  entity.timestamp = event.params.timestamp

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleSchemaRegistered(event: SchemaRegisteredEvent): void {
  let entity = new SchemaRegistered(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.uid = event.params.uid
  entity.registerer = event.params.registerer

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleSchemaResolverRegistered(
  event: SchemaResolverRegisteredEvent
): void {
  let entity = new SchemaResolverRegistered(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.uid = event.params.uid
  entity.registerer = event.params.registerer

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleTimestamped(event: TimestampedEvent): void {
  let entity = new Timestamped(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.data = event.params.data
  entity.timestamp = event.params.timestamp

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
