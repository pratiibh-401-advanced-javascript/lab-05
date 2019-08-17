const Categories = require('../../models-modular/categories/categories.js');
let categories = new Categories();

const supergoose = require('../supergoose.js');

describe('Categories Model', () => {
  beforeEach(() => {
    categories = new Categories();
  });

  // How might we repeat this to check on types?

  it('can post() a new category', () => {
    let obj = { name: 'Test Category', description: 'Category for testing' };
    return categories.create(obj)
      .then(record => {
        Object.keys(obj).forEach(key => {
          expect(record[key]).toEqual(obj[key]);
        });
      })
      .catch(e => console.error);
  });

  it('can get() a category', () => {
    let obj = { name: 'Test Category', description: 'Category for testing' };
    categories.create(obj)
      .then(record => {
        categories.get(record._id)
          .then(category => {
            Object.keys(obj).forEach(key => {
              expect(category[0][key]).toEqual(obj[key]);
            });
          });
      })
      .catch(err => console.error);
  });

  it('can delete() a category', () => {
    let obj = { name: 'Test Category', description: 'Category for testing' };
    categories.create(obj)
      .then(record => {
        return categories.delete(record._id)
          .then(category => {
            expect(categories.get(record._id).name).toBeFalsy();
          });
      })
      .catch(err => console.error);
  });

  it('can update a category', () => {
    let obj = { name: 'Test Category', description: 'Category for testing', zoo: true };
    categories.create(obj)
      .then(record => {
        categories.update(record.id, { name: 'New Test Category', id: 55 })
          .then(category => {
            categories.get(55)
              .then(zz => {
                expect(zz.name).toEqual('New Test Category');
              })
              .catch(err => console.error);
          });
      })
      .catch(err => console.error);
  });

  it('rejects bad type checks', () => {
    let obj = { name: 555 };
    categories.create(obj)
      .then(record => {
        expect(record.id).toBeUndefined();
      })
      .catch(err => console.error);
  });
});