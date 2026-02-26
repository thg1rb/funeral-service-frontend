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
          }
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
};

export default AntProvider;