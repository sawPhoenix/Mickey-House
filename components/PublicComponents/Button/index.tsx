import React, { FC, ButtonHTMLAttributes, AnchorHTMLAttributes, useState, useEffect } from 'react'
import classNames from 'classnames'

export type ButtonSize = 'lg' | 'sm'
export type ButtonType = 'primary' | 'default' | 'danger' | 'link' | 'neon'

interface BaseButtonProps {
  className?: string;
  /**设置 Button 的禁用 */
  disabled?: boolean;
  /**设置 Button 的尺寸 */
  size?: ButtonSize;
  /**设置 Button 的类型 */
  btnType?: ButtonType;
  children: React.ReactNode;
  href?: string;
  neonColor?: string;
}

type NativeButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLElement>
type AnchorButtonProps = BaseButtonProps & AnchorHTMLAttributes<HTMLElement>

export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>
/**
 * 页面中最常用的的按钮元素，适合于完成特定的交互
 * ### 引用方法
 * 
 * ~~~js
 * import { Button } from 'saw-models'
 * ~~~
 */
export const Button: FC<ButtonProps> = (props) => {
  const {
    className,
    btnType,
    disabled,
    size,
    children,
    href,
    neonColor,
    ...restProps
  } = props;
  const [neonCol, setNeonColor] = useState({})
  // btn, btn-lg, btn-primary
  const classes = classNames('btn', className, {
    [`btn-${btnType}`]: btnType,
    [`btn-${size}`]: size,
    [`btn-${size}`]: size,
    'disabled': (btnType === 'link') && disabled
  })
  // const changeColor = useRef(true)
  useEffect(() => {
    if (btnType === "neon") {
      setNeonColor({ color: neonColor || "#4cc9f0" })
    }
  },[])
  const toggleEnter = () => {
    if (btnType === "neon") {
      setNeonColor({ backgroundColor: neonColor || "#4cc9f0", boxShadow: `10px 10px 99px 6px ${neonColor}`})
    }
  }
  const togglLeave = () => {
    if (btnType === "neon") {
      setNeonColor({color: neonColor || "#4cc9f0"})
    }
  }

  if (btnType === "link" && href) {
    return (
      <a
        className={classes}
        href={href}
        {...restProps}
      >
        {children}
      </a>
    )
  } else {
    return (
      <button
        className={classes}
        disabled={disabled}
        style={neonCol}
        onMouseEnter={toggleEnter}
        onMouseLeave={togglLeave}
        {...restProps}
      >
        {children}
      </button>
    )
  }
}
Button.defaultProps = {
  disabled: false,
  btnType: 'default'
}

export default Button;