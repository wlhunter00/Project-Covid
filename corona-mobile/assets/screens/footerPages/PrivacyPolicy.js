import * as React from "react";
import { StyleSheet, Text, View, Button, ScrollView } from "react-native";
import {
  TeamMemberBox,
  CompactTeamMemberBox
} from "../../components/FooterComponents";
import { useStyle } from "../../styles/styles";
import { InfoView } from "./../../components/InfoView";
import { Entypo } from "@expo/vector-icons";
import BigHeaderScrollView from "../../components/BigHeaderScrollView.js";

export default function Team({ route, navigation }) {
  const { styles } = useStyle("container", "tosText", "tosBold");
  const { colors, isDark } = useStyle("backgroundcolor");
  return (
    <View
      contentContainerStyle={{
        paddingHorizontal: 15,
        paddingTop: 15,
        backgroundColor: colors.backgroundcolor
      }}
      style={styles.container}
    >
      <BigHeaderScrollView
        title="Privacy Policy"
        description="Review our privacy policy and terms regarding the app, feel free to contact us with any questions."
        image={
          <Entypo
            name="lock"
            size={100}
            color={!isDark ? colors.textcolor : "#444"}
          />
        }
      >
        <InfoView
          title="Privacy Policy"
          body={
            <View>
              <Text style={styles.tosText}>
                Satvik Sethi, Will Hunter, and collaborators built the Project
                Covid app as a Free app. This SERVICE is provided by LFR
                International at no cost and is intended for use as is.
              </Text>
              <Text style={styles.tosText}>
                This page is used to inform visitors regarding our policies with
                the collection, use, and disclosure of Personal Information if
                anyone decided to use our Service.
              </Text>
              <Text style={styles.tosText}>
                If you choose to use our Service, then you agree to the
                collection and use of information in relation to this policy.
                The Personal Information that we collect is used for providing
                and improving the Service. We will not use or share your
                information with anyone except as described in this Privacy
                Policy.
              </Text>
              <Text style={styles.tosText}>
                The terms used in this Privacy Policy have the same meanings as
                in our Terms and Conditions, which is accessible at Project
                Covid unless otherwise defined in this Privacy Policy.
              </Text>
              <Text style={styles.tosBold}>Information Collection and Use</Text>
              <Text style={styles.tosText}>
                For a better experience, while using our Service, we may require
                you to provide us with certain personally identifiable
                information, including but not limited to location, symptoms,
                and push notifications. The information that we request will be
                retained on your device and is not collected by me in any way.
              </Text>
              <Text style={styles.tosText}>
                The app does use third-party services that may collect
                information used to identify you.
              </Text>
              <Text style={styles.tosBold}>Log Data</Text>
              <Text style={styles.tosText}>
                We want to inform you that whenever you use our Service, in the
                case of an error in the app we collect data and information
                (through third party products) on your phone called Log Data.
                This Log Data may include information such as your device
                Internet Protocol (“IP”) address, device name, operating system
                version, the configuration of the app when utilizing our
                Service, the time and date of your use of the Service, and other
                statistics.
              </Text>
              <Text style={styles.tosBold}>Cookies</Text>
              <Text style={styles.tosText}>
                Cookies are files with a small amount of data that are commonly
                used as anonymous unique identifiers. These are sent to your
                browser from the websites that you visit and are stored on your
                device's internal memory.
              </Text>
              <Text style={styles.tosText}>
                This Service does not use these “cookies” explicitly. However,
                the app may use third party code and libraries that use
                “cookies” to collect information and improve their services. You
                have the option to either accept or refuse these cookies and
                know when a cookie is being sent to your device. If you choose
                to refuse our cookies, you may not be able to use some portions
                of this Service.
              </Text>
              <Text style={styles.tosBold}>Service Providers</Text>
              <Text style={styles.tosText}>
                We may employ third-party companies and individuals due to the
                following reasons:
              </Text>
              <Text style={styles.tosText}>• To facilitate our Service</Text>
              <Text style={styles.tosText}>
                • To provide the Service on our behalf
              </Text>
              <Text style={styles.tosText}>
                • To perform Service-related services
              </Text>
              <Text style={styles.tosText}>
                • To assist us in analyzing how our Service is used
              </Text>
              <Text style={styles.tosText}>
                We want to inform users of this Service that these third parties
                have access to your Personal Information. The reason is to
                perform the tasks assigned to them on our behalf. However, they
                are obligated not to disclose or use the information for any
                other purpose.
              </Text>
              <Text style={styles.tosBold}>Security</Text>
              <Text style={styles.tosText}>
                We value your trust in providing us your Personal Information,
                thus we are striving to use commercially acceptable means of
                protecting it. But remember that no method of transmission over
                the internet, or method of electronic storage is 100% secure and
                reliable, and we cannot guarantee its absolute security.
              </Text>
              <Text style={styles.tosBold}>Links to Other Sites</Text>
              <Text style={styles.tosText}>
                This Service may contain links to other sites. If you click on a
                third-party link, you will be directed to that site. Note that
                these external sites are not operated by me. Therefore, we
                strongly advise you to review the Privacy Policy of these
                websites. we have no control over and assume no responsibility
                for the content, privacy policies, or practices of any
                third-party sites or services.
              </Text>
              <Text style={styles.tosBold}>Children’s Privacy</Text>
              <Text style={styles.tosText}>
                These Services do not address anyone under the age of 13. we do
                not knowingly collect personally identifiable information from
                children under 13. In the case we do discover that a child under
                13 has provided me with personal information, we will
                immediately delete this from our servers. If you are a parent or
                guardian and you are aware that your child has provided us with
                personal information, please contact me so that we will be able
                to do the necessary actions.
              </Text>
              <Text style={styles.tosBold}>Changes to This Privacy Policy</Text>
              <Text style={styles.tosText}>
                We may update our Privacy Policy from time to time. Thus, you
                are advised to review this page periodically for any changes. We
                will notify you of any changes by posting the new Privacy Policy
                on this page. These changes are effective immediately after they
                are posted on this page.
              </Text>
              <Text style={styles.tosBold}>Contact Us</Text>
              <Text style={styles.tosText}>
                If you have any questions or suggestions about our Privacy
                Policy, do not hesitate to contact us at
                info@LFRInternational.org.
              </Text>
            </View>
          }
        />
        <InfoView
          title="Terms & Conditions"
          body={
            <View>
              <Text style={styles.tosText}>
                By downloading or using the app, these terms will automatically
                apply to you – you should make sure therefore that you read them
                carefully before using the app. You’re not allowed to copy or
                modify the app, any part of the app, or our trademarks in any
                way. You’re not allowed to attempt to extract the source code of
                the app, and you also shouldn’t try to translate the app into
                other languages or make derivative versions. The app itself, and
                all the trademarks, copyright, database rights and other
                intellectual property rights related to it, still belong to
                Satvik Sethi, Will Hunter, and LFR International.
              </Text>
              <Text style={styles.tosText}>
                LFR International is committed to ensuring that the app is as
                useful and efficient as possible. For that reason, we reserve
                the right to make changes to the app or to charge for its
                services, at any time and for any reason. We will never charge
                you for the app or its services without making it very clear to
                you exactly what you’re paying for.
              </Text>
              <Text style={styles.tosText}>
                The Project Covid app stores and processes personal data that
                you have provided to us, in order to provide our Service. It’s
                your responsibility to keep your phone and access to the app
                secure. We therefore recommend that you do not jailbreak or root
                your phone, which is the process of removing software
                restrictions and limitations imposed by the official operating
                system of your device. It could make your phone vulnerable to
                malware/viruses/malicious programs, compromise your phone’s
                security features and it could mean that the Project Covid app
                won’t work properly or at all.
              </Text>
              <Text style={styles.tosText}>
                The app does use third party services that declare their own
                Terms and Conditions.
              </Text>
              <Text style={styles.tosText}>
                You should be aware that there are certain things that LFR
                International will not take responsibility for. Certain
                functions of the app will require the app to have an active
                internet connection. The connection can be Wi-Fwe or provided by
                your mobile network provider, but LFR International cannot take
                responsibility for the app not working at full functionality if
                you don’t have access to Wi-Fi, and you don’t have any of your
                data allowance left.
              </Text>
              <Text style={styles.tosText}>
                If you’re using the app outside of an area with Wi-Fi, you
                should remember that your terms of the agreement with your
                mobile network provider will still apply. As a result, you may
                be charged by your mobile provider for the cost of data for the
                duration of the connection while accessing the app, or other
                third-party charges. In using the app, you’re accepting
                responsibility for any such charges, including roaming data
                charges if you use the app outside of your home territory (i.e.
                region or country) without turning off data roaming. If you are
                not the bill payer for the device on which you’re using the app,
                please be aware that we assume that you have received permission
                from the bill payer for using the app.
              </Text>
              <Text style={styles.tosText}>
                Along the same lines, LFR International cannot always take
                responsibility for the way you use the app i.e. You need to make
                sure that your device stays charged – if it runs out of battery
                and you can’t turn it on to avail the Service, LFR International
                cannot accept responsibility.
              </Text>
              <Text style={styles.tosText}>
                With respect to LFR International's responsibility for your use
                of the app, when you’re using the app, it’s important to bear in
                mind that although we endeavor to ensure that it is updated and
                correct at all times, we do rely on third parties to provide
                information to us so that we can make it available to you. LFR
                International accepts no liability for any loss, direct or
                indirect, you experience as a result of relying wholly on this
                functionality of the app.
              </Text>
              <Text style={styles.tosText}>
                At some point, we may wish to update the app. The app is
                currently available on Android & iOS – the requirements for both
                systems (and for any additional systems we decide to extend the
                availability of the app to) may change, and you’ll need to
                download the updates if you want to keep using the app. LFR
                International does not promise that it will always update the
                app so that it is relevant to you and/or works with the Android
                & iOS version that you have installed on your device. However,
                you promise to always accept updates to the application when
                offered to you, We may also wish to stop providing the app, and
                may terminate use of it at any time without giving notice of
                termination to you. Unless we tell you otherwise, upon any
                termination, (a) the rights and licenses granted to you in these
                terms will end; (b) you must stop using the app, and (if needed)
                delete it from your device.
              </Text>
              <Text style={styles.tosBold}>
                Changes to This Terms and Conditions
              </Text>
              <Text style={styles.tosText}>
                We may update our Terms and Conditions from time to time. Thus,
                you are advised to review this page periodically for any
                changes. We will notify you of any changes by posting the new
                Terms and Conditions on this page. These changes are effective
                immediately after they are posted on this page.
              </Text>
              <Text style={styles.tosBold}>Contact Us</Text>
              <Text style={styles.tosText}>
                If you have any questions or suggestions about our Terms and
                Conditions, do not hesitate to contact us at
                info@LFRInternational.org
              </Text>
            </View>
          }
        />
      </BigHeaderScrollView>
    </View>
  );
}
