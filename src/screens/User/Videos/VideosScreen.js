import {View, Text, StyleSheet, StatusBar} from 'react-native';
import TopHeader from '../../../components/Headers/TopHeader/TopHeader';
import BottomHeader from '../../../components/Headers/BottomHeader/BottomHeader';
import { VideosContext } from '../../../helpers/contexts/VideosContext';
import useVideosScreenLogic from './useVideosScreenLogic';
import DisplayVideos from '../../../components/Videos/DisplayVideos/DisplayVideos';

const VideosScreen = ({navigation, route}) => {
    const {
        videosValues
    } = useVideosScreenLogic(route);

    return (
        <>
            <StatusBar barStyle='dark-content' />
            <View style={styles.container}>
                {/* Top Header */}
                <TopHeader />
                
                {/* Videos */}
                <VideosContext.Provider value={videosValues}>
                    <DisplayVideos navigation={navigation} />
                </VideosContext.Provider>

                {/* Bottom Header */}
                <BottomHeader navigation={navigation} />
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#FFFFFF',
    }
});

export default VideosScreen;