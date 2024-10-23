-- DropIndex
DROP INDEX "address_customer_id_key";

-- DropIndex
DROP INDEX "address_user_id_key";

-- AddForeignKey
ALTER TABLE "customer" ADD CONSTRAINT "customer_current_address_id_fkey" FOREIGN KEY ("current_address_id") REFERENCES "address"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_current_address_id_fkey" FOREIGN KEY ("current_address_id") REFERENCES "address"("id") ON DELETE SET NULL ON UPDATE CASCADE;
