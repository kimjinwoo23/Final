package com.six.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class Obo {
  private int oboNo;
  private int memberNo;
  private String memberName;
  private String memberPhone;
  private String memberEmail;
  private String oboTitle;
  private String oboContent;
  private String oboCreateDate;

}
