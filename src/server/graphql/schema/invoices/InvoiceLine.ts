import { objectType } from 'nexus';

export const InvoiceLine = objectType({
  name: 'InvoiceLine',
  definition(t) {
    t.implements('Node');
    t.implements('Owned');
    t.nonNull.string('description', { description: 'Description of item' });
    t.string('unit', { description: 'Unit name' });
    t.nonNull.float('quantity', { description: 'Number of units' });
    t.nonNull.float('unitPrice', { description: 'Price per unit' });
    t.nonNull.int('index', {
      description: 'Index of the line in relation to other lines for the same invoice'
    });
    t.float('discountPercentage', { description: 'Discount in percent for the line' });
    t.nonNull.field('totalPrice', {
      type: 'Float',
      description: 'Total price of the line',
      resolve(root) {
        const totalPrice = root.quantity * root.unitPrice;
        if (!root.discountPercentage) {
          return totalPrice;
        }
        return totalPrice * ((100 - root.discountPercentage) / 100);
      }
    });

    t.nonNull.id('invoiceId', { description: 'Id of invoice' });
    t.nonNull.field('invoice', {
      type: 'Invoice',
      description: 'Invoice of the line',
      resolve: async (parent, _, context) => {
        const invoice = await context.prisma.invoice.findUnique({
          where: { id: parent.invoiceId }
        });
        if (!invoice) {
          throw new Error('No matching invoice found');
        }
        return invoice;
      }
    });

    // t.id('productId', { description: 'Id of connected product' });
    // t.field('product', {
    //   type: 'Product',
    //   description: 'Product connected to the line',
    //   resolve: async (parent, _, context) => {
    //     if (!parent.productId) {
    //       return null;
    //     }
    //     const product = await context.prisma.product.findUnique({
    //       where: { id: parent.productId }
    //     });
    //     if (!product) {
    //       throw new Error('No matching product found');
    //     }
    //     return product;
    //   }
    // });

    t.nonNull.BigInt('userId', { description: 'Id of user' });
    t.nonNull.field('user', {
      type: 'User',
      description: 'Owner of the invoice line',
      resolve: async (parent, _, context) => {
        const user = await context.prisma.user.findUnique({
          where: { id: parent.userId }
        });
        if (!user) {
          throw new Error('No matching user found');
        }
        return user;
      }
    });

    t.nonNull.boolean('active', {
      description: 'Whether or not the item is active. Soft delete items if false'
    });
    t.nonNull.field('createdDate', {
      type: 'DateTime',
      description: 'When item were created'
    });
    t.nonNull.field('updatedDate', {
      type: 'DateTime',
      description: 'When item last were updated'
    });
  }
});

export default InvoiceLine;
