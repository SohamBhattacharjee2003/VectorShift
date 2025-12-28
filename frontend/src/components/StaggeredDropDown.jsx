import { FiCheck, FiChevronDown } from "react-icons/fi";
import { motion } from "framer-motion";
import { useState } from "react";

const StaggeredDropDown = ({ 
  value,
  onChange,
  options = [
    "Text",
    "File",
    "List of files",
    "List of lists of files",
    "Audio",
    "Image",
    "Knowledge Base",
    "Agent"
  ]
}) => {
  const [open, setOpen] = useState(false);

  const handleSelect = (optionText) => {
    if (onChange) onChange(optionText);
    setOpen(false);
  };

  return (
    <motion.div animate={open ? "open" : "closed"} style={{ width: '100%', position: 'relative' }}>
      <button
        onClick={() => setOpen((pv) => !pv)}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '8px',
          padding: '6px 12px',
          paddingRight: '28px',
          borderRadius: '8px',
          border: '1px solid #e5e7eb',
          background: 'white',
          color: '#1f2937',
          fontSize: '9px',
          fontWeight: '400',
          cursor: 'pointer',
          width: '100%',
          textAlign: 'left',
          outline: 'none',
          transition: 'all 0.2s',
          position: 'relative'
        }}
        onFocus={(e) => {
          e.target.style.borderColor = '#d1d5db';
        }}
        onBlur={(e) => {
          e.target.style.borderColor = '#e5e7eb';
        }}
      >
        <span>{value}</span>
        <motion.span 
          variants={iconVariants}
          style={{
            position: 'absolute',
            right: '10px',
            display: 'flex',
            alignItems: 'center',
            color: '#5b21b6'
          }}
        >
          <FiChevronDown size={9} />
        </motion.span>
      </button>

      <motion.ul
        initial={wrapperVariants.closed}
        variants={wrapperVariants}
        style={{ 
          originY: "bottom",
          background: 'white',
          borderRadius: '8px',
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e5e7eb',
          position: 'absolute',
          bottom: 'calc(100% + 4px)',
          left: 0,
          minWidth: '150px',
          overflow: 'hidden',
          zIndex: 50,
          padding: '4px'
        }}
      >
        {options.map((option, index) => (
          <Option 
            key={index}
            text={option} 
            checked={option === value}
            onClick={() => handleSelect(option)}
            isLast={index === options.length - 1}
          />
        ))}
      </motion.ul>
    </motion.div>
  );
};

const Option = ({ text, checked, onClick, isLast }) => {
  return (
    <motion.li
      variants={itemVariants}
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        width: '100%',
        padding: '4px 10px',
        fontSize: '9px',
        fontWeight: '400',
        whiteSpace: 'nowrap',
        borderRadius: '4px',
        color: '#374151',
        cursor: 'pointer',
        transition: 'all 0.2s',
        background: 'transparent',
        listStyle: 'none',
        borderBottom: isLast ? 'none' : '1px solid #e5e7eb',
        marginBottom: isLast ? '0' : '2px'
      }}
      whileHover={{ background: '#f3f4f6' }}
    >
      <span style={{ width: '12px', display: 'flex', alignItems: 'center', color: '#6366f1' }}>
        {checked && <FiCheck size={12} />}
      </span>
      <span>{text}</span>
    </motion.li>
  );
};

const wrapperVariants = {
  open: {
    scaleY: 1,
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.05,
      duration: 0.2
    },
  },
  closed: {
    scaleY: 0,
    opacity: 0,
    transition: {
      when: "afterChildren",
      staggerChildren: 0.05,
      duration: 0.2
    },
  },
};

const iconVariants = {
  open: { rotate: 180 },
  closed: { rotate: 0 },
};

const itemVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.2,
    },
  },
  closed: {
    opacity: 0,
    y: -8,
    transition: {
      duration: 0.2,
    },
  },
};

export default StaggeredDropDown;

