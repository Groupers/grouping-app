import axios from 'axios';
import { SIGN_URL } from '../constant/HttpProperty';
import CommonResponse from '../dto/CommonResponse';
import CheckEmailResponseDto from '../dto/CheckEmailResponseDto';
import CheckPhoneNumberResponseDto from '../dto/CheckPhoneNumberResponseDto';
import { ResponseCode } from '../constant/ResponseCode';
import GroupingUserDto from '../dto/GroupingUserDto';

const TARGET_URL = `${SIGN_URL}`;

export default class SignRepository {
  async checkEmail(email, failedCallback) {
    const response = await axios.get(`${TARGET_URL}/email`, {
      params: { email },
    });
    const commonResponse = new CommonResponse(response.data);

    if (commonResponse.code !== ResponseCode.SUCCEED) {
      failedCallback(commonResponse.code);
      return;
    }

    return new CheckEmailResponseDto(commonResponse.data);
  }

  async enrollEmail(email, failedCallback) {
    const response = await axios.post(`${TARGET_URL}/email`, { email });
    const commonResponse = new CommonResponse(response.data);

    if (commonResponse.code !== ResponseCode.SUCCEED) {
      failedCallback(commonResponse.code);
      return false;
    }
    return true;
  }

  async checkPhoneNumber(phoneNumber, failedCallback) {
    console.log('checkPhoneNumber1');
    const response = await axios.get(`${TARGET_URL}/phone-number`, {
      params: { 'phone-number': phoneNumber },
    });

    const commonResponse = new CommonResponse(response.data);

    if (commonResponse.code !== ResponseCode.SUCCEED) {
      console.log('checkPhoneNumber');
      failedCallback(commonResponse.code);
      return;
    }

    return new CheckPhoneNumberResponseDto(commonResponse.data);
  }

  async enrollPhoneNumber(phoneNumber, failedCallback) {
    console.log('enrollPhoneNumber1');
    const response = await axios.post(`${TARGET_URL}/phone-number`, {
      phoneNumber,
    });

    const commonResponse = new CommonResponse(response.data);

    if (commonResponse.code !== ResponseCode.SUCCEED) {
      failedCallback(commonResponse.code);
      console.log('enrollPhoneNumber');
      console.log(response.data);
      console.log(response.status);
      return false;
    }

    return true;
  }

  async cancelSignUp(email, phoneNumber, failedCallback) {
    const response = await axios.post(`${TARGET_URL}/cancel`, {
      email,
      phoneNumber,
    });

    const commonResponse = new CommonResponse(response.data);

    if (commonResponse.code !== ResponseCode.SUCCEED) {
      failedCallback(commonResponse.code);
    }
  }

  async cancelSignUpEmail(email, failedCallback) {
    console.log('email');
    console.log(email);
    const response = await axios.post(`${TARGET_URL}/cancel/email`, {
      email,
    });

    const commonResponse = new CommonResponse(response.data);

    if (commonResponse.code !== ResponseCode.SUCCEED) {
      failedCallback(commonResponse.code);
    }
  }

  async cancelSignUpPhoneNumber(phoneNumber, failedCallback) {
    const response = await axios.post(`${TARGET_URL}/cancel/phone-number`, {
      phoneNumber,
    });

    const commonResponse = new CommonResponse(response.data);

    if (commonResponse.code !== ResponseCode.SUCCEED) {
      failedCallback(commonResponse.code);
    }
  }

  async completeSignUp(groupingUserDto, failedCallback) {
    const response = await axios.post(`${TARGET_URL}/complete`, groupingUserDto);

    const commonResponse = new CommonResponse(response.data);

    if (commonResponse.code !== ResponseCode.SUCCEED) {
      commonResponse.data;
      failedCallback(commonResponse.code);
      return;
    }

    return new GroupingUserDto(commonResponse.data);
  }

  async signInWithEmail(email, password, failedCallback) {
    const response = await axios.post(`${TARGET_URL}/login/email`, {
      email,
      password,
    });

    const commonResponse = new CommonResponse(response.data);
    if (commonResponse.code !== ResponseCode.SUCCEED) {
      failedCallback(commonResponse.code);
      return;
    }

    return new GroupingUserDto(commonResponse.data);
  }

  async signInWithPhone(phoneNumber, password, failedCallback) {
    const response = await axios.post(`${TARGET_URL}/login/phone-number`, {
      phoneNumber,
      password,
    });

    const commonResponse = new CommonResponse(response.data);
    if (commonResponse.code !== ResponseCode.SUCCEED) {
      failedCallback(commonResponse.code);
      return;
    }

    return new GroupingUserDto(commonResponse.data);
  }
}
