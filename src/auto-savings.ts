import { AutoSaveExecuted as AutoSaveExecutedEvent } from "../generated/AutoSavings/AutoSavings"
import { AutoSaveExecuted } from "../generated/schema"

export function handleAutoSaveExecuted(event: AutoSaveExecutedEvent): void {
  let entity = new AutoSaveExecuted(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.smartAccount = event.params.smartAccount
  entity.token = event.params.token
  entity.amountReceived = event.params.amountReceived

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
