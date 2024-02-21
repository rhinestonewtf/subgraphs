// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt
} from "@graphprotocol/graph-ts";

export class ExecutionAdded extends ethereum.Event {
  get params(): ExecutionAdded__Params {
    return new ExecutionAdded__Params(this);
  }
}

export class ExecutionAdded__Params {
  _event: ExecutionAdded;

  constructor(event: ExecutionAdded) {
    this._event = event;
  }

  get smartAccount(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get jobId(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }
}

export class ExecutionStatusUpdated extends ethereum.Event {
  get params(): ExecutionStatusUpdated__Params {
    return new ExecutionStatusUpdated__Params(this);
  }
}

export class ExecutionStatusUpdated__Params {
  _event: ExecutionStatusUpdated;

  constructor(event: ExecutionStatusUpdated) {
    this._event = event;
  }

  get smartAccount(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get jobId(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }
}

export class ExecutionTriggered extends ethereum.Event {
  get params(): ExecutionTriggered__Params {
    return new ExecutionTriggered__Params(this);
  }
}

export class ExecutionTriggered__Params {
  _event: ExecutionTriggered;

  constructor(event: ExecutionTriggered) {
    this._event = event;
  }

  get smartAccount(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get jobId(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }
}

export class ScheduledTransfers__getAccountJobDetailsResultValue0Struct extends ethereum.Tuple {
  get executeInterval(): BigInt {
    return this[0].toBigInt();
  }

  get numberOfExecutions(): i32 {
    return this[1].toI32();
  }

  get numberOfExecutionsCompleted(): i32 {
    return this[2].toI32();
  }

  get startDate(): BigInt {
    return this[3].toBigInt();
  }

  get isEnabled(): boolean {
    return this[4].toBoolean();
  }

  get lastExecutionTime(): BigInt {
    return this[5].toBigInt();
  }

  get executionData(): Bytes {
    return this[6].toBytes();
  }
}

export class ScheduledTransfers extends ethereum.SmartContract {
  static bind(address: Address): ScheduledTransfers {
    return new ScheduledTransfers("ScheduledTransfers", address);
  }

  getAccountJobDetails(
    smartAccount: Address,
    jobId: BigInt
  ): ScheduledTransfers__getAccountJobDetailsResultValue0Struct {
    let result = super.call(
      "getAccountJobDetails",
      "getAccountJobDetails(address,uint256):((uint48,uint16,uint16,uint48,bool,uint48,bytes))",
      [
        ethereum.Value.fromAddress(smartAccount),
        ethereum.Value.fromUnsignedBigInt(jobId)
      ]
    );

    return changetype<
      ScheduledTransfers__getAccountJobDetailsResultValue0Struct
    >(result[0].toTuple());
  }

  try_getAccountJobDetails(
    smartAccount: Address,
    jobId: BigInt
  ): ethereum.CallResult<
    ScheduledTransfers__getAccountJobDetailsResultValue0Struct
  > {
    let result = super.tryCall(
      "getAccountJobDetails",
      "getAccountJobDetails(address,uint256):((uint48,uint16,uint16,uint48,bool,uint48,bytes))",
      [
        ethereum.Value.fromAddress(smartAccount),
        ethereum.Value.fromUnsignedBigInt(jobId)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      changetype<ScheduledTransfers__getAccountJobDetailsResultValue0Struct>(
        value[0].toTuple()
      )
    );
  }

  getModuleTypes(): BigInt {
    let result = super.call("getModuleTypes", "getModuleTypes():(uint256)", []);

    return result[0].toBigInt();
  }

  try_getModuleTypes(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "getModuleTypes",
      "getModuleTypes():(uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  isInitialized(smartAccount: Address): boolean {
    let result = super.call("isInitialized", "isInitialized(address):(bool)", [
      ethereum.Value.fromAddress(smartAccount)
    ]);

    return result[0].toBoolean();
  }

  try_isInitialized(smartAccount: Address): ethereum.CallResult<boolean> {
    let result = super.tryCall(
      "isInitialized",
      "isInitialized(address):(bool)",
      [ethereum.Value.fromAddress(smartAccount)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  isModuleType(typeID: BigInt): boolean {
    let result = super.call("isModuleType", "isModuleType(uint256):(bool)", [
      ethereum.Value.fromUnsignedBigInt(typeID)
    ]);

    return result[0].toBoolean();
  }

  try_isModuleType(typeID: BigInt): ethereum.CallResult<boolean> {
    let result = super.tryCall("isModuleType", "isModuleType(uint256):(bool)", [
      ethereum.Value.fromUnsignedBigInt(typeID)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  name(): string {
    let result = super.call("name", "name():(string)", []);

    return result[0].toString();
  }

  try_name(): ethereum.CallResult<string> {
    let result = super.tryCall("name", "name():(string)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toString());
  }

  validateSessionParams(
    destinationContract: Address,
    callValue: BigInt,
    callData: Bytes,
    _sessionKeyData: Bytes,
    param4: Bytes
  ): Address {
    let result = super.call(
      "validateSessionParams",
      "validateSessionParams(address,uint256,bytes,bytes,bytes):(address)",
      [
        ethereum.Value.fromAddress(destinationContract),
        ethereum.Value.fromUnsignedBigInt(callValue),
        ethereum.Value.fromBytes(callData),
        ethereum.Value.fromBytes(_sessionKeyData),
        ethereum.Value.fromBytes(param4)
      ]
    );

    return result[0].toAddress();
  }

  try_validateSessionParams(
    destinationContract: Address,
    callValue: BigInt,
    callData: Bytes,
    _sessionKeyData: Bytes,
    param4: Bytes
  ): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "validateSessionParams",
      "validateSessionParams(address,uint256,bytes,bytes,bytes):(address)",
      [
        ethereum.Value.fromAddress(destinationContract),
        ethereum.Value.fromUnsignedBigInt(callValue),
        ethereum.Value.fromBytes(callData),
        ethereum.Value.fromBytes(_sessionKeyData),
        ethereum.Value.fromBytes(param4)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  version(): string {
    let result = super.call("version", "version():(string)", []);

    return result[0].toString();
  }

  try_version(): ethereum.CallResult<string> {
    let result = super.tryCall("version", "version():(string)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toString());
  }
}

export class AddOrderCall extends ethereum.Call {
  get inputs(): AddOrderCall__Inputs {
    return new AddOrderCall__Inputs(this);
  }

  get outputs(): AddOrderCall__Outputs {
    return new AddOrderCall__Outputs(this);
  }
}

export class AddOrderCall__Inputs {
  _call: AddOrderCall;

  constructor(call: AddOrderCall) {
    this._call = call;
  }

  get executionConfig(): AddOrderCallExecutionConfigStruct {
    return changetype<AddOrderCallExecutionConfigStruct>(
      this._call.inputValues[0].value.toTuple()
    );
  }
}

export class AddOrderCall__Outputs {
  _call: AddOrderCall;

  constructor(call: AddOrderCall) {
    this._call = call;
  }
}

export class AddOrderCallExecutionConfigStruct extends ethereum.Tuple {
  get executeInterval(): BigInt {
    return this[0].toBigInt();
  }

  get numberOfExecutions(): i32 {
    return this[1].toI32();
  }

  get numberOfExecutionsCompleted(): i32 {
    return this[2].toI32();
  }

  get startDate(): BigInt {
    return this[3].toBigInt();
  }

  get isEnabled(): boolean {
    return this[4].toBoolean();
  }

  get lastExecutionTime(): BigInt {
    return this[5].toBigInt();
  }

  get executionData(): Bytes {
    return this[6].toBytes();
  }
}

export class ExecuteOrderCall extends ethereum.Call {
  get inputs(): ExecuteOrderCall__Inputs {
    return new ExecuteOrderCall__Inputs(this);
  }

  get outputs(): ExecuteOrderCall__Outputs {
    return new ExecuteOrderCall__Outputs(this);
  }
}

export class ExecuteOrderCall__Inputs {
  _call: ExecuteOrderCall;

  constructor(call: ExecuteOrderCall) {
    this._call = call;
  }

  get jobId(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class ExecuteOrderCall__Outputs {
  _call: ExecuteOrderCall;

  constructor(call: ExecuteOrderCall) {
    this._call = call;
  }
}

export class OnInstallCall extends ethereum.Call {
  get inputs(): OnInstallCall__Inputs {
    return new OnInstallCall__Inputs(this);
  }

  get outputs(): OnInstallCall__Outputs {
    return new OnInstallCall__Outputs(this);
  }
}

export class OnInstallCall__Inputs {
  _call: OnInstallCall;

  constructor(call: OnInstallCall) {
    this._call = call;
  }

  get data(): Bytes {
    return this._call.inputValues[0].value.toBytes();
  }
}

export class OnInstallCall__Outputs {
  _call: OnInstallCall;

  constructor(call: OnInstallCall) {
    this._call = call;
  }
}

export class OnUninstallCall extends ethereum.Call {
  get inputs(): OnUninstallCall__Inputs {
    return new OnUninstallCall__Inputs(this);
  }

  get outputs(): OnUninstallCall__Outputs {
    return new OnUninstallCall__Outputs(this);
  }
}

export class OnUninstallCall__Inputs {
  _call: OnUninstallCall;

  constructor(call: OnUninstallCall) {
    this._call = call;
  }

  get value0(): Bytes {
    return this._call.inputValues[0].value.toBytes();
  }
}

export class OnUninstallCall__Outputs {
  _call: OnUninstallCall;

  constructor(call: OnUninstallCall) {
    this._call = call;
  }
}

export class ToggleOrderCall extends ethereum.Call {
  get inputs(): ToggleOrderCall__Inputs {
    return new ToggleOrderCall__Inputs(this);
  }

  get outputs(): ToggleOrderCall__Outputs {
    return new ToggleOrderCall__Outputs(this);
  }
}

export class ToggleOrderCall__Inputs {
  _call: ToggleOrderCall;

  constructor(call: ToggleOrderCall) {
    this._call = call;
  }

  get jobId(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class ToggleOrderCall__Outputs {
  _call: ToggleOrderCall;

  constructor(call: ToggleOrderCall) {
    this._call = call;
  }
}
