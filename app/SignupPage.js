
//...
import SocialButton from '../components/SocialButton';

const SignupScreen = ({navigation}) => {
  //...

  return (
    <View style={styles.container}>
      //...
      <SocialButton
        buttonTitle="Sign Up with Google"
        btnType="google"
        color="#de4d41"
        backgroundColor="#f5e7ea"
        onPress={() => {}}
      />

      //...
    </View>
  );
};

export default SignupScreen;