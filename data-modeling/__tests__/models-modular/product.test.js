const Categories = require('../../models-singular/categories.js');


const supergoose = require('../supergoose.js');

describe('Categories Model (Singular)', () => {
  let categories;
  beforeEach(() => {
    categories = new Categories();
  });

  // How will you handle both the happy path and edge cases in these tests?

  it('can create() a new category', () => {
    let obj = { name: 'Test Category', description: 'toy', price:'5' };
    return categories.create(obj)
      .then(record => categories.get(record.id))
      .then(dbRecord => {
        expect(dbRecord.name).toEqual(obj.name);
      })
      .catch(e => console.error);
  });

  it('can get() a category', () => {
    let obj = { name: 'Test Category', description: 'toy', price:'5' };
    return categories.create(obj)
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

  it('can get() all categories', () => {
    let obj = { name: 'Test Category', price:'5' };
    return categories.create(obj)
      .then(record => {
        return categories.get(record)
          .then(dbRecord => {
            Object.keys(obj).forEach(key => {
              expect(dbRecord.name).toEqual(obj.name);
            });
          });
      })
      .catch(e => console.error);
  });

  it('can update() a category', () => {
    let obj = { name: 'Test Category', description: 'toy', price:'5', zoo: true };
    categories.create(obj)
      .then(record => {
        categories.update(record.id, { name: 'The New Test Category', id: 83 })
          .then(category => {
            categories.get(83)
              .then(changedID => {
                expect(changedID.name).toEqual('The New Test Category');
              })
              .catch(err => console.error);
          });
      })
      .catch(err => console.error);
  });

  it('can delete() a category', () => {
    let obj = { name: 'Test Category', description: 'toy', price:'5' };
    categories.create(obj)
      .then(record => {
        return categories.delete(record._id)
          .then(category => {
            expect(categories.get(record._id).name).toBeFalsy();
          });
      })
      .catch(err => console.error);
  });

});