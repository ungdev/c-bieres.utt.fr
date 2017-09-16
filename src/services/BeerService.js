import BaseService from './BaseService';

class BeerService extends BaseService {

    constructor() {
        super('beer');
    }

}

export default new BeerService();
