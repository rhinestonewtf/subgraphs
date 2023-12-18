import { newMockEvent } from "matchstick-as";
import { ethereum, Address, Bytes } from "@graphprotocol/graph-ts";
import {
  Attested,
  ModuleRegistration,
  Revoked,
} from "../generated/Registry/Registry";

export function createAttestedEvent(
  subject: Address,
  attester: Address,
  schema: Bytes,
  dataPointer: Address
): Attested {
  let attestedEvent = changetype<Attested>(newMockEvent());

  attestedEvent.parameters = new Array();

  attestedEvent.parameters.push(
    new ethereum.EventParam("subject", ethereum.Value.fromAddress(subject))
  );
  attestedEvent.parameters.push(
    new ethereum.EventParam("attester", ethereum.Value.fromAddress(attester))
  );
  attestedEvent.parameters.push(
    new ethereum.EventParam("schema", ethereum.Value.fromFixedBytes(schema))
  );
  attestedEvent.parameters.push(
    new ethereum.EventParam(
      "dataPointer",
      ethereum.Value.fromAddress(dataPointer)
    )
  );

  return attestedEvent;
}

export function createModuleRegistrationEvent(
  implementation: Address,
  sender: Address,
  resolver: Bytes
): ModuleRegistration {
  let moduleRegistrationEvent = changetype<ModuleRegistration>(newMockEvent());

  moduleRegistrationEvent.parameters = new Array();

  moduleRegistrationEvent.parameters.push(
    new ethereum.EventParam(
      "implementation",
      ethereum.Value.fromAddress(implementation)
    )
  );
  moduleRegistrationEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  );
  moduleRegistrationEvent.parameters.push(
    new ethereum.EventParam("resolver", ethereum.Value.fromFixedBytes(resolver))
  );

  return moduleRegistrationEvent;
}

export function createRevokedEvent(
  subject: Address,
  revoker: Address,
  schema: Bytes
): Revoked {
  let revokedEvent = changetype<Revoked>(newMockEvent());

  revokedEvent.parameters = new Array();

  revokedEvent.parameters.push(
    new ethereum.EventParam("subject", ethereum.Value.fromAddress(subject))
  );
  revokedEvent.parameters.push(
    new ethereum.EventParam("revoker", ethereum.Value.fromAddress(revoker))
  );
  revokedEvent.parameters.push(
    new ethereum.EventParam("schema", ethereum.Value.fromFixedBytes(schema))
  );

  return revokedEvent;
}
