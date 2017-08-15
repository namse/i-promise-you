const PROMISE_STATUS = {
  PENDING: 'PENDING',
  RESOLVED: 'RESOLVED',
  REJECTED: 'REJECTED',
};

class NamPromise {
  constructor(func) {
    this.status = PROMISE_STATUS.PENDING;
    this.onResolved = (value) => {
      this.status = PROMISE_STATUS.RESOLVED;
    };
    this.onRejected = (error) => {
      this.status = PROMISE_STATUS.REJECTED;
      console.log('Unhandled Promises Exception', error);
    };

    if (func) {
      setTimeout(() =>
        func(this.onResolved, this.onRejected), 0);
    }
  }

  then(func) {
    const NextPromise = new NamPromise();
    this.onResolved = (value) => {
      this.status = PROMISE_STATUS.RESOLVED;
      try {
        const retValue = func(value);
        if (retValue instanceof NamPromise) {
          retValue.then((value) => {
            NextPromise.onResolved(retValue);
          });
        } else {
          NextPromise.onResolved(retValue);
        }
      } catch (err) {
        NextPromise.onRejected(err);
      }
    };
    this.onRejected = (err) => {
      this.status = PROMISE_STATUS.REJECTED;
      NextPromise.onRejected(err);
    };
    return NextPromise;
  }

  catch(func) {
    const NextPromise = new NamPromise();
    this.onRejected = (err) => {
      this.status = PROMISE_STATUS.REJECTED;
      try {
        const retValue = func(err);
        if (retValue instanceof NamPromise) {
          retValue.then((value) => {
            NextPromise.onResolved(retValue);
          });
        } else {
          NextPromise.onResolved(retValue);
        }
      } catch (err) {
        NextPromise.onRejected(err);
      }
    };
    return NextPromise;
    this.onResolved = (value) => {
      this.status = PROMISE_STATUS.RESOLVED;
      NextPromise.onResolved(value);
    };
  }
}

module.exports = NamPromise;
