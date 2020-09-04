import * as React from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { inject, observer } from 'mobx-react';
import Colors from 'react-native/Libraries/NewAppScreen/components/Colors';
import { GROUPING_CREATION_VIEW_STATUS } from '../../../../../constant/GroupingCreationViewStatus';
import { WINDOW_SIZE } from '../../../../../constant/WindowSize';
import InputDescriptionTextView from './InputDescriptionTextView';
import { COLORS } from '../../../../../assets/Colors';

// eslint-disable-next-line react/prop-types
const InputNewGroupDescriptionView = (props) => {
  const onHeaderNextButtonClicked = () => {
    props.groupingCreationMainStore.groupingCreationViewChanged(
      GROUPING_CREATION_VIEW_STATUS.DESCRIPTION
    );
    props.navigation.pop();
  };

  const rightIconStyle = (groupingCreationView) => {
    return {
      marginRight: 15 * WINDOW_SIZE.WIDTH_WEIGHT,
      fontSize: 18 * WINDOW_SIZE.WIDTH_WEIGHT,
      color: props.groupingCreationMainStore.isHeaderRightIconActivated(groupingCreationView)
        ? Colors.black
        : '#999',
    };
  };

  const onDescriptionChanged = (description) => {
    props.groupingCreationMainStore.groupingDescriptionChanged(description);
    props.groupingCreationMainStore.groupingCreationViewChanged(
      GROUPING_CREATION_VIEW_STATUS.DESCRIPTION
    );

    props.navigation.setOptions({
      headerRight: () => (
        <Text
          onPress={() => {
            onHeaderNextButtonClicked();
          }}
          style={rightIconStyle(GROUPING_CREATION_VIEW_STATUS.DESCRIPTION)}
        >
          완료
        </Text>
      ),
    });
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ScrollView
        style={{
          flex: 1,
          // paddingRight: 30 * WINDOW_SIZE.WIDTH_WEIGHT,
          // paddingLeft: 30 * WINDOW_SIZE.WIDTH_WEIGHT,
        }}
      >
        <InputDescriptionTextView
          textExample="1500자 내로 입력해주세요."
          value={props.groupingCreationMainStore.groupingDescription}
          onChangeText={onDescriptionChanged.bind(this)}
        />
      </ScrollView>
      <View
        style={{
          height: 30,
          width: '100%',
          justifyContent: 'center',
          alignItems: 'flex-end',
          backgroundColor: 'white',
        }}
      >
        <Text
          style={{
            fontSize: 9 * WINDOW_SIZE.WIDTH_WEIGHT,
            color: COLORS.FONT_GRAY,
            paddingRight: 30 * WINDOW_SIZE.WIDTH_WEIGHT,
          }}
        >
          {props.groupingCreationMainStore.groupingDescription.length}/1500
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    borderColor: 'black',
    borderBottomWidth: 1 * WINDOW_SIZE.WIDTH_WEIGHT,
    flexDirection: 'row',
    width: '90%',
    margin: 10 * WINDOW_SIZE.WIDTH_WEIGHT,
  },

  title: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10 * WINDOW_SIZE.WIDTH_WEIGHT,
    marginLeft: 10 * WINDOW_SIZE.WIDTH_WEIGHT,
    marginBottom: 10 * WINDOW_SIZE.HEIGHT_WEIGHT,
    color: Colors.black,
    fontSize: 15 * WINDOW_SIZE.WIDTH_WEIGHT,
  },

  counter: {
    color: 'black',
  },
});

export default inject('groupingCreationMainStore')(observer(InputNewGroupDescriptionView));
