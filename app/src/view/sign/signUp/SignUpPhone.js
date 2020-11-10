import React from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { inject, observer } from 'mobx-react';
import NextButton from '../components/NextButton';
import LabelView from '../components/LabelView';
import PhoneNumberInputTextView from '../components/PhoneNumberInputTextView';
import SignErrorMessageView from '../components/SignErrorMessageView';
import { SIGN_UP_PHONE_VIEW_STATUS } from '../../../constant/SignUpPhoneStatus';
import PhoneCodeInputTextView from '../components/PhoneCodeInputTextView';
import PhoneCodeNextButton from '../components/PhoneCodeNextButton';
import { COLORS } from '../../../assets/Colors';
import PhoneAuthTimer from '../../../component/PhoneAuthTimer';
import { TIME_OUT } from '../../../constant/TimeOut';
import { WINDOW_SIZE } from '../../../constant/WindowSize';

// 컴포넌트를 생성 할 때는 constructor -> componentWillMount -> render -> componentDidMount 순으로 진행됩니다.

// 컴포넌트를 제거 할 때는 componentWillUnmount 메소드만 실행됩니다.

// 컴포넌트의 prop이 변경될 때엔 componentWillReceiveProps -> shouldComponentUpdate -> componentWillUpdate-> render -> componentDidUpdate 순으로 진행됩니다.

// 이 예제에는 없지만 state가 변경될 떄엔 props 를 받았을 때 와 비슷하지만 shouldComponentUpdate 부터 시작됩니다.

@inject('signUpPhoneStore')
@observer
class SignUpPhone extends React.Component {
  constructor(props) {
    super(props);
  }

  // 컴포넌트가 만들어지고 첫 렌더링을 다 마친 후 실행되는 메소드입니다.
  // 이 안에서 다른 JavaScript 프레임워크를 연동하거나,
  // setTimeout, setInterval 및 AJAX 처리 등을 넣습니다.
  async componentDidMount() {
    this.focusListener = this.props.navigation.addListener(
      'focus',
      this.props.signUpPhoneStore.clearPhoneNumber.bind(this)
    );
  }

  componentWillUnmount() {
    this.focusListener();
  }

  async signUpNextButtonClicked() {
    this.props.signUpPhoneStore.phoneCodeValidationSucceed.bind(this);
    this.props.signUpPhoneStore.isAllCompleted ? this.signUpNextButtonClicked.bind(this) : null;
    await this.props.signUpPhoneStore.completePhoneNumber();
    this.props.navigation.navigate('SignUpEmail');
  }

  // prop 혹은 state 가 변경 되었을 때, 리렌더링을 할지 말지 정하는 메소드입니다.
  // 위 예제에선 무조건 true 를 반환 하도록 하였지만, 실제로 사용 할 떄는 필요한 비교를 하고 값을 반환하도록 하시길 바랍니다.
  // 예: return nextProps.id !== this.props.id;
  // JSON.stringify() 를 쓰면 여러 field 를 편하게 비교 할 수 있답니다.
  render() {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 0}
        style={styles.body}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.inner}>
            <View style={styles.contentContainer}>
              <View style={styles.textArea}>
                <Text style={{ fontSize: 25, marginBottom: 6, color: COLORS.BLACK }}>
                  휴대폰 번호를 입력해주세요
                </Text>
                <Text style={{ fontSize: 12, color: COLORS.BLACK, lineHeight: 18 }}>
                  {
                    '허위 및 중복 가입을 예방하기 위한 절차입니다. \n핸드폰번호는 타인에게 절대 공개되지 않습니다.'
                  }
                </Text>
              </View>
              <View height={12 * WINDOW_SIZE.HEIGHT_WEIGHT} />
              <View>
                <LabelView text="휴대폰 번호" />
                <PhoneNumberInputTextView
                  label="휴대폰 번호"
                  isActive={!this.props.signUpPhoneStore.isAllCompleted}
                  text={this.props.signUpPhoneStore.phoneNumber}
                  onChangeText={this.props.signUpPhoneStore.phoneNumberChanged.bind(this)}
                  placeholder="-없이 번호 입력"
                />
                {/* <SignErrorMessageView text={this.props.signUpPhoneStore.errorMessage} /> */}
                <LabelView text="인증번호" />
                <PhoneCodeInputTextView
                  onChangeText={this.props.signUpPhoneStore.phoneCodeChanged.bind(this)}
                  onBlur={() => {
                    this.props.signUpPhoneStore.phoneCodeValidationSucceed.bind(this);
                  }}
                  text={this.props.signUpPhoneStore.phoneCode}
                />
              </View>
            </View>
            <View style={styles.bottomContainer}>
              <NextButton
                isActive={this.props.signUpPhoneStore.isValidPhoneCode}
                text="다음"
                onClick={this.signUpNextButtonClicked.bind(this)}
                buttonType={false}
                fontColor={COLORS.WHITE}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: COLORS.MAIN_COLOR,
    alignItems: 'center',
    justifyContent: 'center',
  },

  inner: {
    backgroundColor: COLORS.MAIN_COLOR,
    // alignItems: 'center',
    // marginLeft: 30 * WINDOW_SIZE.WIDTH_WEIGHT,
    // marginEnd: 30 * WINDOW_SIZE.WIDTH_WEIGHT,
  },
  contentContainer: {
    marginLeft: 30 * WINDOW_SIZE.WIDTH_WEIGHT,
    marginRight: 30 * WINDOW_SIZE.WIDTH_WEIGHT,
    alignItems: 'center',
  },
  textArea: {
    width: '100%',
    marginTop: 10,
  },
  phoneCodeContainer: {
    backgroundColor: 'green',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },

  bottomContainer: {
    // borderWidth:2,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 1,
  },

  authButton: {},
});

export default SignUpPhone;
