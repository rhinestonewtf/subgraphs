import { newMockEvent } from "matchstick-as"
import { ethereum, Address, Bytes, BigInt } from "@graphprotocol/graph-ts"
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
} from "../generated/Registry/Registry"

export function createAttestedEvent(
  subject: Address,
  attester: Address,
  schema: Bytes,
  dataPointer: Address
): Attested {
  let attestedEvent = changetype<Attested>(newMockEvent())

  attestedEvent.parameters = new Array()

  attestedEvent.parameters.push(
    new ethereum.EventParam("subject", ethereum.Value.fromAddress(subject))
  )
  attestedEvent.parameters.push(
    new ethereum.EventParam("attester", ethereum.Value.fromAddress(attester))
  )
  attestedEvent.parameters.push(
    new ethereum.EventParam("schema", ethereum.Value.fromFixedBytes(schema))
  )
  attestedEvent.parameters.push(
    new ethereum.EventParam(
      "dataPointer",
      ethereum.Value.fromAddress(dataPointer)
    )
  )

  return attestedEvent
}

export function createModuleDeployedEvent(
  implementation: Address,
  salt: Bytes,
  resolver: Bytes
): ModuleDeployed {
  let moduleDeployedEvent = changetype<ModuleDeployed>(newMockEvent())

  moduleDeployedEvent.parameters = new Array()

  moduleDeployedEvent.parameters.push(
    new ethereum.EventParam(
      "implementation",
      ethereum.Value.fromAddress(implementation)
    )
  )
  moduleDeployedEvent.parameters.push(
    new ethereum.EventParam("salt", ethereum.Value.fromFixedBytes(salt))
  )
  moduleDeployedEvent.parameters.push(
    new ethereum.EventParam("resolver", ethereum.Value.fromFixedBytes(resolver))
  )

  return moduleDeployedEvent
}

export function createModuleDeployedExternalFactoryEvent(
  implementation: Address,
  factory: Address,
  resolver: Bytes
): ModuleDeployedExternalFactory {
  let moduleDeployedExternalFactoryEvent = changetype<
    ModuleDeployedExternalFactory
  >(newMockEvent())

  moduleDeployedExternalFactoryEvent.parameters = new Array()

  moduleDeployedExternalFactoryEvent.parameters.push(
    new ethereum.EventParam(
      "implementation",
      ethereum.Value.fromAddress(implementation)
    )
  )
  moduleDeployedExternalFactoryEvent.parameters.push(
    new ethereum.EventParam("factory", ethereum.Value.fromAddress(factory))
  )
  moduleDeployedExternalFactoryEvent.parameters.push(
    new ethereum.EventParam("resolver", ethereum.Value.fromFixedBytes(resolver))
  )

  return moduleDeployedExternalFactoryEvent
}

export function createModuleRegistrationEvent(
  implementation: Address,
  sender: Address,
  resolver: Bytes
): ModuleRegistration {
  let moduleRegistrationEvent = changetype<ModuleRegistration>(newMockEvent())

  moduleRegistrationEvent.parameters = new Array()

  moduleRegistrationEvent.parameters.push(
    new ethereum.EventParam(
      "implementation",
      ethereum.Value.fromAddress(implementation)
    )
  )
  moduleRegistrationEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )
  moduleRegistrationEvent.parameters.push(
    new ethereum.EventParam("resolver", ethereum.Value.fromFixedBytes(resolver))
  )

  return moduleRegistrationEvent
}

export function createNewSchemaResolverEvent(
  uid: Bytes,
  resolver: Address
): NewSchemaResolver {
  let newSchemaResolverEvent = changetype<NewSchemaResolver>(newMockEvent())

  newSchemaResolverEvent.parameters = new Array()

  newSchemaResolverEvent.parameters.push(
    new ethereum.EventParam("uid", ethereum.Value.fromFixedBytes(uid))
  )
  newSchemaResolverEvent.parameters.push(
    new ethereum.EventParam("resolver", ethereum.Value.fromAddress(resolver))
  )

  return newSchemaResolverEvent
}

export function createRevokedEvent(
  subject: Address,
  revoker: Address,
  schema: Bytes
): Revoked {
  let revokedEvent = changetype<Revoked>(newMockEvent())

  revokedEvent.parameters = new Array()

  revokedEvent.parameters.push(
    new ethereum.EventParam("subject", ethereum.Value.fromAddress(subject))
  )
  revokedEvent.parameters.push(
    new ethereum.EventParam("revoker", ethereum.Value.fromAddress(revoker))
  )
  revokedEvent.parameters.push(
    new ethereum.EventParam("schema", ethereum.Value.fromFixedBytes(schema))
  )

  return revokedEvent
}

export function createRevokedOffchainEvent(
  revoker: Address,
  data: Bytes,
  timestamp: BigInt
): RevokedOffchain {
  let revokedOffchainEvent = changetype<RevokedOffchain>(newMockEvent())

  revokedOffchainEvent.parameters = new Array()

  revokedOffchainEvent.parameters.push(
    new ethereum.EventParam("revoker", ethereum.Value.fromAddress(revoker))
  )
  revokedOffchainEvent.parameters.push(
    new ethereum.EventParam("data", ethereum.Value.fromFixedBytes(data))
  )
  revokedOffchainEvent.parameters.push(
    new ethereum.EventParam(
      "timestamp",
      ethereum.Value.fromUnsignedBigInt(timestamp)
    )
  )

  return revokedOffchainEvent
}

export function createSchemaRegisteredEvent(
  uid: Bytes,
  registerer: Address
): SchemaRegistered {
  let schemaRegisteredEvent = changetype<SchemaRegistered>(newMockEvent())

  schemaRegisteredEvent.parameters = new Array()

  schemaRegisteredEvent.parameters.push(
    new ethereum.EventParam("uid", ethereum.Value.fromFixedBytes(uid))
  )
  schemaRegisteredEvent.parameters.push(
    new ethereum.EventParam(
      "registerer",
      ethereum.Value.fromAddress(registerer)
    )
  )

  return schemaRegisteredEvent
}

export function createSchemaResolverRegisteredEvent(
  uid: Bytes,
  registerer: Address
): SchemaResolverRegistered {
  let schemaResolverRegisteredEvent = changetype<SchemaResolverRegistered>(
    newMockEvent()
  )

  schemaResolverRegisteredEvent.parameters = new Array()

  schemaResolverRegisteredEvent.parameters.push(
    new ethereum.EventParam("uid", ethereum.Value.fromFixedBytes(uid))
  )
  schemaResolverRegisteredEvent.parameters.push(
    new ethereum.EventParam(
      "registerer",
      ethereum.Value.fromAddress(registerer)
    )
  )

  return schemaResolverRegisteredEvent
}

export function createTimestampedEvent(
  data: Bytes,
  timestamp: BigInt
): Timestamped {
  let timestampedEvent = changetype<Timestamped>(newMockEvent())

  timestampedEvent.parameters = new Array()

  timestampedEvent.parameters.push(
    new ethereum.EventParam("data", ethereum.Value.fromFixedBytes(data))
  )
  timestampedEvent.parameters.push(
    new ethereum.EventParam(
      "timestamp",
      ethereum.Value.fromUnsignedBigInt(timestamp)
    )
  )

  return timestampedEvent
}
