import {
  ModuleInstalled as ModuleInstalledEvent,
  ModuleUninstalled as ModuleUninstalledEvent,
} from "../generated/SmartAccount/SmartAccount";
import {
  ModuleInstalled,
  ModuleUninstalled,
  ModuleQuery,
} from "../generated/schema";

export function handleModuleInstalled(event: ModuleInstalledEvent): void {
  let entity = new ModuleInstalled(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.moduleTypeId = event.params.moduleTypeId;
  entity.module = event.params.module;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
  addModuleToQuery(event);
}

export function handleModuleUninstalled(event: ModuleUninstalledEvent): void {
  let entity = new ModuleUninstalled(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.moduleTypeId = event.params.moduleTypeId;
  entity.module = event.params.module;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
  removeModuleFromQuery(event);
}

function addModuleToQuery(event: ModuleInstalledEvent): void {
  const moduleQueryId = event.params._event.address.concat(event.params.module);

  let moduleQuery = ModuleQuery.load(moduleQueryId);

  if (moduleQuery == null) {
    moduleQuery = new ModuleQuery(moduleQueryId);
    moduleQuery.module = event.params.module;
    moduleQuery.moduleTypeId = event.params.moduleTypeId;
    moduleQuery.smartAccount = event.params._event.address;
  }
  moduleQuery.isInstalled = true;

  moduleQuery.blockNumber = event.block.number;
  moduleQuery.blockTimestamp = event.block.timestamp;
  moduleQuery.transactionHash = event.transaction.hash;

  moduleQuery.save();
}

function removeModuleFromQuery(event: ModuleUninstalledEvent): void {
  const moduleQueryId = event.params._event.address.concat(event.params.module);

  let moduleQuery = ModuleQuery.load(moduleQueryId);

  if (moduleQuery !== null) {
    moduleQuery.isInstalled = false;
    moduleQuery.save();
  }
}
