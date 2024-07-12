import { Stack } from 'expo-router';
import * as React from 'react';
import { Platform, View } from 'react-native';
import { KeyboardAwareScrollView, KeyboardGestureArea } from 'react-native-keyboard-controller';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button } from '~/components/nativewindui/Button';
import { Form, FormItem, FormSection } from '~/components/nativewindui/Form';
import { Text } from '~/components/nativewindui/Text';
import { TextField } from '~/components/nativewindui/TextField';
import { cn } from '~/lib/cn';

export default function FormScreen() {
  const insets = useSafeAreaInsets();
  const [canSave, setCanSave] = React.useState(false);

  function onChange() {
    if (!canSave) {
      setCanSave(true);
    }
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Name',
          headerRight: Platform.select({
            ios: () => (
              <Button className="ios:px-0" disabled={!canSave} variant="plain">
                <Text className={cn(canSave && 'text-primary')}>Save</Text>
              </Button>
            ),
          }),
        }}
      />
      <KeyboardGestureArea interpolator="ios">
        <KeyboardAwareScrollView
          bottomOffset={8}
          keyboardShouldPersistTaps="always"
          keyboardDismissMode={Platform.select({ ios: 'on-drag' })}
          contentContainerStyle={{ paddingBottom: insets.bottom }}>
          <Form className="gap-5 px-4 pt-8">
            <FormSection materialIconProps={{ name: 'person-outline' }}>
              <FormItem>
                <TextField
                  textContentType="none"
                  autoComplete="off"
                  label={Platform.select({ ios: undefined, default: 'First' })}
                  leftView={Platform.select({ ios: <LeftLabel>First</LeftLabel> })}
                  placeholder={Platform.select({ ios: 'required' })}
                  onChange={onChange}
                />
              </FormItem>
              <FormItem>
                <TextField
                  textContentType="none"
                  autoComplete="off"
                  label={Platform.select({ ios: undefined, default: 'Middle' })}
                  leftView={Platform.select({ ios: <LeftLabel>Middle</LeftLabel> })}
                  placeholder={Platform.select({ ios: 'optional' })}
                  onChange={onChange}
                />
              </FormItem>
              <FormItem>
                <TextField
                  textContentType="none"
                  autoComplete="off"
                  label={Platform.select({ ios: undefined, default: 'Last' })}
                  leftView={Platform.select({ ios: <LeftLabel>Last</LeftLabel> })}
                  placeholder={Platform.select({ ios: 'required' })}
                  onChange={onChange}
                />
              </FormItem>
            </FormSection>
            {Platform.OS !== 'ios' && (
              <View className="items-end">
                <Button className="px-6">
                  <Text>Save</Text>
                </Button>
              </View>
            )}
          </Form>
        </KeyboardAwareScrollView>
      </KeyboardGestureArea>
    </>
  );
}

function LeftLabel({ children }: { children: string }) {
  return (
    <View className="justify-center pl-2 w-28">
      <Text>{children}</Text>
    </View>
  );
}
