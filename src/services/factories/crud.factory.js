import isValidId from '../../utils/helpers';

class CRUD {
  constructor(_model) {
    this.model = _model;
  }

  async create() {
    //   this.

    const result = await this.model.create();

    return {
      result,
      error: false,
    };
  }

  async getOne(id) {
    if (id && isValidId(id)) {
      const item = await this.model.findOne({ _id: id }, { __v: 0 });
      // const item = await this.model.findOne({ _id: id }, { password: 0, __v: 0 });
      if (!item) {
        throw new Error('User does not exist');
      }
      return item;
    }
    throw new Error('Invalid user id');
    // return { error: true, message: 'Invalid user id' };
  }

  async getCount() {
    const count = await this.model.countDocuments();

    return count;
  }

  async getAll(limit, page) {
    const _limit = Number(limit) || 10;
    const _skip = Number((page - 1) * limit) || 0;

    const result = await Promise.all([
      // User.find({}, { password: 0, __v: 0 }).sort({ email: 1 }).skip(_skip).limit(_limit),
      this.model.find({}, { __v: 0 }).skip(_skip).limit(_limit),
      // .populate('workspaces'),
      this.model.countDocuments(),
    ]);

    if (Number(page) * limit < result[1]) {
      return {
        page,
        next: page + 1,
        limit: _limit,
        users: result[0],
        total: result[1],
      };
    }
    return {
      page,
      next: null,
      limit: _limit,
      users: result[0],
      total: result[1],
    };
  }

  async update(id, _data) {
    // Prevent change of email
    const data = _data;
    // const data = { ..._data };
    // delete userData.email;

    const item = await this.model.findByIdAndUpdate({ _id: id }, { $set: data }, { new: true });

    if (!item) throw new Error("Item dosen't exist");

    return item;
  }

  async delete(id) {
    const item = await this.model.findOne({ _id: id });
    item.remove();
    return item;
  }
}

export default CRUD;
