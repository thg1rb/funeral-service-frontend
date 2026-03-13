import { ConfigProvider, theme } from 'antd';

interface Props {
  children: React.ReactNode;
}

const AntProvider = ({ children }: Props) => {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,

        token: {
          fontFamily: 'var(--font-noto)',

          colorPrimary: '#b8860b',
          colorBgBase: '#1a1d23',
          colorTextBase: '#ebecf0',

          borderRadius: 8,
          colorBorder: 'var(--color-border)',

          controlOutline: 'rgba(184, 134, 11, 0.15)',
          controlOutlineWidth: 2,
          colorErrorOutline: 'rgba(255, 77, 79, 0.1)',
        },
        components: {
          Table: {
            headerBg: 'var(--color-card)',
            headerColor: 'var(--color-primary)',
            rowHoverBg: 'var(--color-accent)',
            borderColor: 'var(--color-accent)',
            headerBorderRadius: 8,
          },
          Button: {
            borderRadius: 6,
            controlHeight: 40,
          },
          Select: {
            optionSelectedBg: '#2a2e35',
            optionActiveBg: '#333842',

            optionSelectedColor: '#b8860b',

            colorBorder: 'var(--color-border)',
            colorPrimaryHover: '#b8860b',
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
};

export default AntProvider;