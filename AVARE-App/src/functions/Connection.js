import { setConnectivity } from '../redux/modules/network/actions'
import { store } from '../../App'

export const onConnectivityChange = (reach) => {
    console.log('Network change');
    console.log(reach)
    store.dispatch(setConnectivity(reach));
}